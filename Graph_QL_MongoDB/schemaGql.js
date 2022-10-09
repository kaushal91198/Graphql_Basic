import {
    gql
} from 'apollo-server'

const typeDefs = gql `
type Query{
    users:[User]
    quote:[QuoteWithName]
    user(_id:ID!):User
    userQuotes(by:ID!):[QuoteWithName]
    myProfile:User
}

type QuoteWithName {
    _id:ID!
    name:String
    by:IDName
}
type IDName {
    _id:ID!
    firstName:String!

}

type User{
    _id:ID!
    firstName:String!
    lastName:String!
    email:String!
    password:String!
    quotes:[userquote]
}
type userquote {
    _id:ID
    name:String
}

type Quote{
    name:String!
    by:ID!
}

type token {
   token:String! 
}

type Mutation {
    signupUser(userNew:UserSignUpInput):User 
    signInUser(userNew:UserSignInInput):token 
    createQuote(name:String!):String
}

input UserSignUpInput{
    firstName:String!,
    lastName:String!,
    email:String!,
    password:String!
}

input UserSignInInput{
    email:String!
    password:String!
}
`


// type Mutation {
//     signupUserDummy(firstName:String!,lastName:String!,email:String!,password:String!):User 
// }

export default typeDefs