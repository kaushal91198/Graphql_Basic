import bcryptjs from 'bcryptjs'
import User from './models/User.js'
import Quote from './models/Quotes.js'
import jwt from 'jsonwebtoken'
import {
    JWT_SECRET
} from './config.js'
import mongoose from 'mongoose'
//create resolver
const resolvers = {
    Query: {
        // greet: () => {
        //     return "Hello World!"
        // }  
        users: async () => await User.aggregate([{
            $lookup: {
                from: 'quotes',
                localField: '_id',
                foreignField: 'by',
                as: 'quotes'
            }
        }]),
        myProfile: async (_, {
            args // third argument is context
        }, {
            userId
        }) => {
            if (!userId) {
                throw new Error("You must be logged in")
            }
            const profile = await User.aggregate([
                { $match: { _id: mongoose.Types.ObjectId(userId) } },
                {
                    $lookup: {
                        from: 'quotes',
                        localField: '_id',
                        foreignField: 'by',
                        as: 'quotes'
                    }
                }
            ])
           if(profile.length!==0){
               return profile[0]
           }
           else{
            throw new Error ('user not found')
           }

        },

        quote: async () => await Quote.find({}).populate("by", "_id firstName"),
        //this has no parent that's why we put _
        user: async (_, ObjectId) => await User.findById(ObjectId._id),

        userQuotes: async (_, _id) => await Quote.find({
            by: _id.by
        }).populate("by", "_id firstName")

    },
    // we receive first argument parent and parent is user
    // User: {
    //     quotes: async (user) => await Quote.findById(user._id)
    // },
    Mutation: {
        signupUser: async (_, {
            userNew
        }) => {
            const user = await User.findOne({
                email: userNew.email
            })
            if (user) {
                throw new Error('User already exist with that email.')
            }
            let hashedPassword = await bcryptjs.hash(userNew.password, 8)
            let newUser = new User({
                ...userNew,
                password: hashedPassword
            })
            return await newUser.save()
        },
        signInUser: async (_, {
            userNew
        }) => {
            const user = await User.findOne({
                email: userNew.email
            })
            if (!user) {
                throw new Error('User not found.')
            }
            const doMatch = await bcryptjs.compare(userNew.password, user.password)
            if (!doMatch) {
                throw new Error('Invalid Password')
            }
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET)
            return {
                token
            }

        },
        createQuote: async (_, {
            name // third argument is context
        }, {
            userId
        }) => {
            if (!userId) {
                throw new Error("You must be logged in")
            }
            let newQuote = new Quote({
                name,
                by: mongoose.Types.ObjectId(userId)
            })
            await newQuote.save()
            return "Quote saved successfully."
        },
    },


}



export default resolvers