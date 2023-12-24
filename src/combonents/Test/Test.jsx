import React, { useContext } from 'react'
import { authContext } from '../context/AuthenticationContext'
import Login from '../Login/Login'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {

    const { token } = useContext(authContext)
    // console.log(localStorage.getItem('tkn'));

    if (token === null) {


        return <Navigate to='/login' />
    }


    return <>
        <div>

            {children}

        </div>
    </>
}
