import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoImage from '../assets/logo.svg'
import { api } from '../lib/axios'

export function AuthenticationRegister() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function Register() {

        if (!email || !password) {
            return
        }

        await api.post('register', {
            email,
            password
        })

        setEmail('')
        setPassword('')

        alert('Cadastro realizado com sucesso!')
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div>
                <img src={logoImage} alt="logo" />
            </div>

            <form className="flex flex-col rounded-lg justify-center items-center p-10 w-3/6">
                <input
                    type="text"
                    id="title"
                    placeholder="Digite seu E-mail"
                    className="p-4 w-3/4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-zinc-900"
                    onChange={event => setEmail(event.target.value)}
                    autoFocus
                />

                <input
                    type="password"
                    id="title"
                    placeholder="Digite sua Senha"
                    className="p-4 w-3/4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-zinc-900"
                    onChange={event => setPassword(event.target.value)}
                    autoFocus
                />
                
                <button
                    type="button"
                    className="w-3/4 mt-6 rounded-lg flex items-center justify-center gap-3 font-semibold border-none bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-zinc-900"
                    onClick={Register}
                >
                    Entrar
                </button>

                <div className="mt-3">
                    <label htmlFor="title" className="">
                        Já possui uma conta?
                    </label>

                    <Link to="/login" className="font-bold text-white hover:text-violet-700">
                        &nbsp;Login
                    </Link>
                </div>
            </form>
        </div>
    )
}