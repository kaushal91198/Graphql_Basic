import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const NavBar = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    return (
        <nav>
            <div className="nav-wrapper #673ab7 deep-purple">
                <Link to='/' href="#" className="brand-logo left">Quote App</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">

                    {token ? <>
                        <li><Link to='/profile' href="sass.html">Profile</Link></li>
                        <li><Link to='/create' href="sass.html">Create</Link></li>
                        <button className='red btn' onClick={() => {
                            localStorage.removeItem("token")
                            navigate('/login')
                        }
                        }>Logout</button>
                    </>
                        :
                        <>
                            <li><Link to='/login' href="sass.html">Login</Link></li>
                            <li><Link to='/signup' href="sass.html">SignUp</Link></li>
                        </>
                    }
                </ul>
            </div>
        </nav >
    )
}

export default NavBar