import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { GET_ALL_QUOTES } from '../gqloperations/queries'



const Home = () => {
    // useEffect(() => {
    //     fetch('http://localhost:4000/', {
    //         method: 'post',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(
    //             {
    //                 query: `query getAllQuotes {
    //                 quote{
    //                   name
    //                    by  {
    //                     firstName
    //                   }    
    //                 }
    //               }`
    //             }
    //         )

    //         // if we want to pass variables
    //         // body: JSON.stringify(
    //         //     {
    //         //         query: `query userQuote($userId:ID!) {
    //         //             userQuotes(by:$userId){
    //         //                name
    //         //                by{
    //         //                 firstName
    //         //                }
    //         //             }
    //         //           }`,
    //         //         variables: {
    //         //             userId: "631f48ff1599ce595517d83c"
    //         //         }
    //         //     }
    //         // )


    //     }).then((res) => res.json()).then((data) => console.log(data))


    // }, [])

    const { loading, error, data } = useQuery(GET_ALL_QUOTES)
    if (loading) return (<h1>Loading...</h1>)
    if (error) { console.log(error) }
    if (data.quote.length === 0) {
        return (<h2>No quotes available</h2>)
    }
    // apollo client store same reply in cache
    return (

        <div className='container'>
            {
                data.quote.map((quote) => {
                    return (
                        <blockquote key={quote._id}>
                            <h6>{quote.name}</h6>
                            <p className='right-align'>~{quote.by.firstName}</p>
                        </blockquote>
                    )
                })
            }
        </div>
    )
}

export default Home