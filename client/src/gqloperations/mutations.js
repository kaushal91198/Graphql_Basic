import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
mutation signUpUser($userNew:UserSignUpInput) {
    signupUser(userNew:$userNew)
      {
      firstName
    }
  }
`


export const LOGIN_USER = gql`
mutation signInUser($userNew:UserSignInInput!) {
  user:signInUser(userNew:$userNew){
    token
  }
}
`

export const CREATE_QUOTE = gql`
mutation signInUser($name:String!) {
  createQuote(name:$name)
  }
`