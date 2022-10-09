import {
    ApolloServer
} from 'apollo-server'
import {
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core'
import typeDefs from './schemaGql.js'
import mongoose from 'mongoose'
import {
    JWT_SECRET,
    MongoDbUrl
} from './config.js'
import jwt from 'jsonwebtoken'
//from client side what type of client query we can do
//client can do greet query sever will respond string
// const typeDefs = gql`
// type Query{
//     greet:String
// }
// `

mongoose.connect(MongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).on('error', (err) => {
    console.log('Connection failed...', err)
});
const context = ({
    req
}) => {
    const {
        authorization
    } = req.headers
    if (authorization) {
        const {
            userId
        } = jwt.verify(authorization, JWT_SECRET)
        return {
            userId
        }
    }
}

//To maintain orders
//import resolvers
import resolvers from './resolvers.js'

//apollo server instance
const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    //to run in background
    context,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})

server.listen().then(({
    url
}) => {
    console.log(`Server ready at ${url}`)
})