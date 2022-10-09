import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_MY_PROFILE } from '../gqloperations/queries'

const Profile = () => {

    const { loading, error, data } = useQuery(GET_MY_PROFILE)
    if (loading) return (<h1>Loading...</h1>)
    if (error) { console.log(error) }
    if (error || !localStorage.getItem('token')) {
        return( <h2>Unauthorized</h2>)
    }

    return (
        <div className='container my-container'>
            {
                error &&
                <div className='red card-panel'>
                    {error.message}
                </div>
            }
            <div className='center-align'>
                <img className="circle" style={{ border: "2px solid", marginTop: "10px" }} src="https://robohash.org/munno.png?200x200" alt="pic" />
                <h5>{data.myProfile.firstName}</h5>
                <h6> {data.myProfile.email}</h6>
            </div>
            <h3>Your Quotes</h3>
            {
                data.myProfile.quotes.map((quote) => {
                    return (
                        <blockquote key={quote._id}>
                            <h6>{quote.name}</h6>
                            {/* <p className='right-align'>~{quote.by.firstName}</p> */}
                        </blockquote>
                    )
                })
            }
        </div>)

}

export default Profile