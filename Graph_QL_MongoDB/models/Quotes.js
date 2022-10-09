import mongoose, {
    Mongoose
} from 'mongoose'

const quoteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Quote = mongoose.model("Quote", quoteSchema)
export default Quote