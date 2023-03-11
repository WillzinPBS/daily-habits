import { Fragment } from 'react'
import * as R from 'react-router-dom'

import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Home } from '../pages/Home'
import { RequireAuth } from '../auth/RequireAuth'

// const Private = ({ Item = () =>{return (<></>)} }) => {
//     const signed = UseAuth()

//     return signed == false ? <Login/> : <Item/>
// }

export function AppRoutes() {
    return (
        <R.BrowserRouter>
            <Fragment>
                <R.Routes>
                    <R.Route path="/login"      element={<Login/>} />
                    <R.Route path="/register"   element={<Register/>} />
                    {/* <R.Route path="/home"       element={<Private Item={Home}/>} /> */}
                    <R.Route path="/home"       element={<RequireAuth><Home/></RequireAuth>} />
                    <R.Route path="/"           element={<Login/>} />
                    <R.Route path="*"           element={<Login/>} />
                </R.Routes>
            </Fragment>
        </R.BrowserRouter>
    )
}