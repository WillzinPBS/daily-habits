import dayjs from 'dayjs'
import { FastifyInstance } from "fastify"
import { z } from 'zod'
import { prisma } from "./prisma"

export async function appRoutes(app: FastifyInstance) {

    //App Routes
    app.post('/habits', async (request) => {
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(
                z.number().min(0).max(6)
                )
        })

        const { title, weekDays } = createHabitBody.parse(request.body)

        const today = dayjs().startOf('day').toDate()

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return{
                            week_day: weekDay
                        }
                    })
                }
            }
        })
    })

    app.get('/day', async (request) => {
        const getDayParams = z.object({
            date: z.coerce.date()
        })

        const {date} = getDayParams.parse(request.query)

        const parsedDate = dayjs(date).startOf('day')
        const weekDay = dayjs(date).get('day')

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date,
                },
                weekDays: {
                    some: {
                        week_day: weekDay,
                    }
                }
            }
        })

        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate(),
            },
            include: {
                dayHabits: true,
            }
        })

        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        }) ?? []

        return {
            possibleHabits,
            completedHabits
        }

    })

    app.patch('/habits/:id/toggle', async (request) => {
        const toggleHabitsParms = z.object({
            id: z.string().uuid()
        })

        const { id } = toggleHabitsParms.parse(request.params)

        const today = dayjs().startOf('day').toDate()

        let day = await prisma.day.findUnique({
            where: {
                date: today,
            }
        })

        if (!day) {
            day = await prisma.day.create({
                data: {
                    date: today
                }
            })
        }

        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id: id,
                }
            }
        })

        if (dayHabit) {
            await prisma.dayHabit.delete({
                where: {
                    id: dayHabit.id,
                }
            })
        } else {
            await prisma.dayHabit.create({
                data: {
                    day_id: day.id,
                    habit_id: id,
                }
            })
        }

    })

    app.get('/summary', async () => {
        const summary = await prisma.$queryRaw`
            select
                d.id,
                d.date,
                (
                    select
                        cast(count(*) as float)
                    from day_habits dh
                    where
                        dh.day_id = d.id
                ) as completed,
                (
                    select
                        cast(count(*) as float)
                    from habit_week_days hwd
                    join habits h on
                        h.id = hwd.habit_id
                    where
                        hwd.week_day = cast(strftime('%w', d.date/1000, 'unixepoch') as int) and
                        h.created_at <= d.date
                ) as amount
            from days d
        `

        return summary
    })

    //Authentication Routes
    app.post('/register', async (request) => {
        const registerUser = z.object({
            email: z.string(),
            password: z.string()
        })

        const { email, password } = registerUser.parse(request.body)

        const today = dayjs().startOf('day').toDate()

        await prisma.user.create({
            data: {
                email,
                password,
                created_at: today,
            }
        })
    })
    
    app.get('/login', async (request) => {
        const getUserParams = z.object({
            email: z.string(),
            password: z.string()
        })

        const { email, password } = getUserParams.parse(request.query)

        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password
            }
        })

        const token = user?.id //teste

        return {user, token}
    })
    
    app.get('/validateToken', async (request) => {
        const getUserParams = z.object({
            id: z.string()
        })

        const { id } = getUserParams.parse(request.query)

        const user = await prisma.user.findFirst({
            where: {
                id: id
            }
        })
        
        return user
    })

}