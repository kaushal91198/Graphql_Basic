import { gql } from "@apollo/client";

export const GET_ALL_QUOTES = gql`
query getAllQuotes {
    quote{
    _id 
      name
       by    {
        _id
        firstName
      }    
    }
  }
`
export const GET_MY_PROFILE = gql`
query getProfile {
  myProfile{
    _id
    firstName
    password
    quotes{
      name
      _id
    }
  }
  }
`



