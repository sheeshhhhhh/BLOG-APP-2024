import mongoose from "mongoose"

const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("DB is Connected")
    } catch (error) {
        console.log("error connecting to DB", error.message)
    }
}

export default connectToDB