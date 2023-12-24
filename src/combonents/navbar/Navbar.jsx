
import { Link, Outlet, useNavigate } from 'react-router-dom'


import React, { useContext } from 'react'
import { authContext } from '../context/AuthenticationContext'
import { cartContext } from './../context/cartContext';
import logo from '../../imags/freshcart-logo.svg'
export default function Navbar() {
    const { numOfCartItems } = useContext(cartContext)

    const { token, settoken } = useContext(authContext)

    // console.log(token);
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('tkn')
        settoken(null);
        navigate('login')

    }









    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link className="navbar-brand" to=""><img src={logo} alt="Fresh cart" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse  " id="navbarNav">
                        <ul className="navbar-nav ms-0">

                            {token ? <> <li className="nav-item">
                                <Link className="nav-link" to="profile">Profile</Link>
                            </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="products">Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="allorders">Allorders</Link>
                                </li>


                                <li className="nav-item">
                                    <Link className="nav-link active  position-relative" aria-current="page" to="cart">Cart

                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                            {numOfCartItems}
                                        </span>
                                    </Link>

                                </li>


                                </> : ''}


                           
                        </ul>



                        <ul className="navbar-nav ms-auto align-items-center">

                            {token ? <>
                                <li className='text-black'>

                                    <i className='fa-brands me-2 fa-facebook-f'></i>
                                    <i className='fa-brands me-2 fa-twitter'></i>
                                    <i className='fa-brands me-2 fa-whatsapp'></i>
                                    <i className='fa-brands me-2 fa-linkedin'></i>


                                </li>
                                <li className="nav-item">
                                    <span onClick={logout} style={{ cursor: 'pointer' }} className="nav-link" to="login">logout</span>
                                </li></> : <>   <li className="nav-item">
                                    <Link className="nav-link" to="register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="login">Login</Link>
                                </li></>}


                            {/* apifunc */}
                        </ul>
                    </div>
                </div>
            </nav>



        </div>
    )
}
