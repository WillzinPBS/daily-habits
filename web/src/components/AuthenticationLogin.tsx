import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import logoImage from '../assets/logo.svg'
import { AuthContext } from '../auth/AuthContext';
import swal from 'sweetalert'

export function AuthenticationLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = useContext(AuthContext)

    // const [isRegistered, setIsRegistered] = useState(false)

    // function LoginAuthentication() {

    //     if (!email || !password) {
    //         return
    //     }
        
    //     api.get('login', {
    //         params: {
    //             email: email,
    //             password: password
    //         }
    //     }).then(response => {
    //         // setIsRegistered(response.data)
    //         GoToHomeIfLogged(response.data)
    //         alert(response.data)
    //     })
        
    // }

    // function GoToHomeIfLogged(isRegistered: boolean) {
        
    //     if (isRegistered) {
    //         navigate('/home')
    //     } else {
    //         alert('Você não possui login')
    //     }
        
    // }

    const LoginAuthentication = async () => {
        if (email && password) {
            const isLogged = await auth.signin(email, password)

            if (isLogged) {
                navigate('/home')
            } else {
                alert('Verifique o seu e-mail e senha e tente novamente.')
            }
        }
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
                />
                
                <button
                    type="button"
                    className="w-3/4 mt-6 rounded-lg flex items-center justify-center gap-3 font-semibold border-none bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-zinc-900"
                    onClick={LoginAuthentication}
                >
                    Entrar
                </button>

                <div className="mt-3">
                    <label htmlFor="title" className="">
                        Não tem uma conta?
                    </label>

                    <Link to="/register" className="font-bold text-white hover:text-violet-700">
                        &nbsp;Registre-se
                    </Link>
                </div>
            </form>
        </div>

        //rounded-lg border-2 border-violet-900 
    )
}