import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SIGNUP_USER } from '../gqloperations/mutations'

const SignUp = () => {
    const [formData, setFormData] = useState({})

    //First parameter is called and that can be called
    const [signUpUser, { data, loading, error }] = useMutation(SIGNUP_USER)
    if (loading) return (<h1>Loading...</h1>)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signUpUser({
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
            {
                data && data.signupUser &&
                <div className='red card-panel'>
                    {data.signupUser.firstName} is signedUp. You can login now
                </div>
            }
            <h5>SignUp!</h5>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type='text'
                    placeholder='First NAme'
                    value={formData.firstName}
                    name='firstName'
                    onChange={handleChange}
                    required
                />
                <input
                    type='text'
                    placeholder='Last NAme'
                    value={formData.lastName}
                    name='lastName'
                    onChange={handleChange}
                    required
                />
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
                    onChange={handleChange}
                    required
                />
                <Link to='/signup'><p>Already have an account ?</p></Link>
                <button className='btn #673ab7 deep-purple' type='submit'>Signup</button>
            </form>
        </div>
    )
}

export default SignUp