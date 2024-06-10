import mongoose from 'mongoose'

const ResetCodeSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true
    }
})


const ResetCode = mongoose.model("ResetCode", ResetCodeSchema)

export default ResetCode