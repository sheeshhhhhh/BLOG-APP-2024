import mongoose, { mongo } from "mongoose";

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    Author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
    },
    HashTag: {
        type: String,
    },
    body: {
        type: String,
        required: true
    },
    HeaderPhoto: {
        type: String,
    },
    Comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        },
    ]
}, { timestamps: true })

const Blog = mongoose.model('Blog', BlogSchema)

export default Blog