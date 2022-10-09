import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_USER } from '../gqloperations/mutations'
import { GET_MY_PROFILE } from '../gqloperations/queries'

const Login = () => {
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    //On completed method there is also after LOGIN_USER argument - see video at
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER
        , {
            refetchQueries: [
                "getAllQuotes",
                'getProfile'
            ]
        }
        // , {
        //     onCompleted(data) {
        //         localStorage.setItem('token', data.user.token)
        //         navigate('/')
        //     }
        // }
    )
    if (loading) return (<h1>Loading...</h1>)
    if (data) {
        localStorage.setItem('token', data.user.token)
        localStorage.setItem('username', formData.email)
        navigate('/')
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        loginUser({
            variables: {
                userNew: formData
            }
        })
    }
    return (
        <div className='container my-container'>
            {
                error &&
                <div className='red card-panel'>
                    {error.message}
                </div>
            }
            <h5>Login!</h5>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type='email'
                    placeholder='email'
                    value={formData.email}
                    name='email'
                    onChange={handleChange}
                    required
                />
                <input
                    type='password'
                    placeholder='password'
                    value={formData.password}
                    name='password'
                    // onChange={e => handleChange(e)}
                    onChange={handleChange}
                    required
                />
                <Link to='/signup'><p>Don't have an account ?</p></Link>
                <button className='btn #673ab7 deep-purple' type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login