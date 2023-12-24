import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../context/AuthenticationContext'
import {jwtDecode} from 'jwt-decode';
import { Helmet } from 'react-helmet';

export default function Info() {

    const [name, setname] = useState(null)


    useEffect(() => {

        const x = jwtDecode(localStorage.getItem('tkn'));
        setname(x.name);
    }, [])

    if (name == null) {
        return <h1>looding</h1>

    }


    return <>

        <Helmet>
            <meta charSet="utf-8" />
            <title>Profile</title>

        </Helmet>
        <div className='text-center p2'><h1>hello ya  {name}</h1>
        </div>


    </>
}
