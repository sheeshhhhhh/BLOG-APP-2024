import mongoose from 'mongoose'


// id is for oauth authentication seeing if they are registered
// also the email is for credential recovery
// we are not responsible for google recovery so we don't need their emails but we can also send notif if they put their emails in


// username and password is only for credential authentication because google is going to authen
// ticate them not us
const UserSchema = mongoose.Schema({
    id: {
        type: String
    },
    username: {
        type: String,
    },
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    avatarUrl: {
        type: String,
    },
    Bio: {
        type: String,
        maxlength: 100
    },
    Links: [
        {
            type: String,
        }
    ],
    Blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)

export default User