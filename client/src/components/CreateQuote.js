import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { CREATE_QUOTE } from '../gqloperations/mutations'

const CreateQuote = () => {
    const [quote, setQuote] = useState("")
    //t ore fetch the query not getting the data from cache memory on appolo client
    const [createQuote, { data, loading, error }] = useMutation(CREATE_QUOTE, 
        {
        refetchQueries: [
            "getAllQuotes",
            'getProfile'
        ]
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        createQuote({
            variables: {
                name: quote
            }
        })
    }
    if (loading) return (<h1>Loading...</h1>)

    return (
        <div className='container my-container'>
            {
                error &&
                <div className='red card-panel'>
                    {error.message}
                </div>
            }
            {
                data &&
                <div className='green card-panel'>
                    {data.createQuote}
                </div>
            }
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Write Your Quote'
                    value={quote}
                    onChange={e => setQuote(e.target.value)}
                    required
                />
                <button className='btn green'>Create</button>
            </form>
        </div>
    )
}

export default CreateQuote