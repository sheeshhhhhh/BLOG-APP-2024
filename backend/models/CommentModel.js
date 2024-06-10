import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    // this will identify the comment
    type: {
        type: String,
        enum: ['parent', 'child'],
        required: true
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    // the parent comment is for child 
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    },
    // the child Comments is for parents
    // you can't have both
    // this is an array because a pare nt component can have many array
    childComments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {timestamps: true})

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment