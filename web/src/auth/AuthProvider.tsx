import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { User } from "../types/User"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }: { children: JSX.Element }) => {

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken')

            if (storageData) {
                const data = await api.get('validateToken', {
                    params: {
                        id: storageData
                    }
                })

                if (data.data) {
                    setUser(data.data)
                }
            }
        }

        validateToken()
    }, [])

    const signin = async (email: string, password: string) => {
        const data = await api.get('login', {
            params: {
                email: email,
                password: password
            }
        })

        if (data.data.user && data.data.token) {
            setUser(data.data.user)
            setToken(data.data.token)

            return true
        } else {
            return false
        }
    }

    const signout = async () => {
        setUser(null)
        setToken('')
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token)
    }

    return (
        <AuthContext.Provider value={{user, signin, signout}}>
            {children}
        </AuthContext.Provider>
    )
}