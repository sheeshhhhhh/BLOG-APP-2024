import express from 'express'
import User from '../models/UserModel.js'
import { ensureAuthenticated } from '../Middleware/ensureAuthenticated.js'
import mongoose from 'mongoose'
import multer from 'multer'
import ResetCode from '../models/ResetCodeModels.js'
import { sendEmail } from '../utils/SendEmail.js'



// this is responsible for editing profile, blogs and following
// also for following someone and seeing who follows you and others
// also where you search profile and profile dynamic for visiting profile
// we also need to have multer here so that we can save the picture the he wants to edit on his profile
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, 'backend/routes/upload/profile')
    },
    filename: function(req, file, cb) {
        return cb (null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage: storage})    

const router = express.Router()

// UPDATING PROFILE INFO
router.post('/profile/updateAvatar', upload.single('image'), ensureAuthenticated ,async (req, res) => {
    try {
        if(!req.file) return res.status(400).json({ error : "no file submited"})
        const { filename } = req.file
        const userid = req.user._id
        const fileUrl = 'http://localhost:5000/uploads/' + filename

        const updateAvatarUrl = await User.updateOne({ _id: userid }, {
            $set: {
                avatarUrl: fileUrl
            }
        }) 

        if(!updateAvatarUrl) return res.status(400).json({ error : 'failed to update profile'})

        res.status(200).json(updateAvatarUrl)
    } catch (error) {
        console.log({error : "error in the /profile/updateAvatar", error})
        res.status(500).json({ error : "internal server error"})
    }
})

router.post('/profile/updateprofile', ensureAuthenticated, async (req, res) => {
    try {
        const { username, email, Bio, displayName } = req.body
        const userId = req.user._id

        if(!displayName) return res.status(400).json({ error : "please don't empty the required fields"})

        if (!userId) return res.status(400).json({ error : "you are not authenticated in the server"})

        const updateProfile = await User.updateMany({_id: userId },{
            $set: {
                username: username ,
                email: email || '',
                Bio: Bio|| '',
                displayName: displayName
            }
        })
        
        console.log(updateProfile)

        if(!updateProfile) return res.status(400).json({ error : "internal server error"})

        res.status(200).json(updateProfile)
    } catch (error) {
        console.log("error in the /profile/updateProfile", error.message)
        res.status(500).json({ error : "internal server error"})
    }
})

router.post('/profile/updatesocialmedia', ensureAuthenticated, async (req, res) => {
    try {
        const link = req.body
        const user = req.user

        const userupdate = await User.updateMany({ _id: user._id}, {
            $set: {
                Links: [link[0], link[1], link[2], link[3]]
            }
        })

        res.status(200).json(userupdate)
    } catch (error) {
        console.log("errror in the /profile/updatesocialmedia", error.message)
        res.status(500).json("internal server error")
    }
})

// resetting password using node mailer 
//PROCESS 
// sending the code to the email
router.post('/profile/forget-password', async (req, res) => {
    try {
        const { email } = req.body
        if(!email) return res.status(400).json({ error : 'no email submitted'})

        const userEmail = await User.findOne({email: email}).select('email')

        if(!userEmail) return res.status(400).json({ error : 'No User exist in the provided email'})

        //generate random code
        const randomcode = Math.floor(Math.random() * 10000)

        // need to handle if the resetcode already exist
        // make resetcodemodel in the data base
        const deleteifexist = await ResetCode.findOneAndDelete({ email: email})
        const createresetcode = await ResetCode.create({
            email: userEmail.email,
            code: randomcode,
            createdAt: new Date()
        })

        console.log(createresetcode)

        if(!createresetcode) return res.status(400).json({ error : 'failed to create reset code!'})
        sendEmail(userEmail.email, randomcode, res)

        res.status(200).json({message : 'successfully send the code'})
    } catch (error) {
        console.log("error in the /profile/forget-password controller", error)
        res.status(500).json({ error : 'internal server error'})
    }
})
//
router.post('/profile/resendcode', async (req, res) => {
    try {
        const { email } = req.body
        if(!email) return res.status(400).json({ error : "no email provided!"})

        const previouscode = await ResetCode.deleteOne({email: email})

        const randomcode = Math.floor(Math.random() * 10000)
        const newcode = await ResetCode.create({
            email: email,
            code:randomcode
        })
        sendEmail(email, randomcode, res)

        res.status(200).json({ message : "Code has been successfully sent!"})
    } catch (error) {
        console.log("error in the /profile/forger-password", error)
        res.status(500).json({ error : "internal server error"})
    }
})
// verifying the code to the data base and sending the email
router.post('/profile/verifycode', async(req, res) => {
    try {
        const { code, email } = req.body
        if(!email) return res.status(400).json({ error : 'fill in the field!'})

        const findemail = await ResetCode.findOne({code: code})
        if(!findemail) return res.status(400).json({ error : 'wrong wode!'})
        if(findemail.email != email) return res.status(400).json({ error: 'wrong code!'}) 
        const deleteresetcode = await ResetCode.deleteOne({code: code})

        const currentUser = await User.findOne({email: findemail.email}).select('username')
        if(!currentUser?.username) return res.status(400).json({ error : "Can't be recovered, From OAuth"})
        res.status(200).json(currentUser.username)
    } catch (error) {
        console.log("error in the /profile/reset-password controller", error)
        res.status(500).json({ error : 'internal server error'})
    }
})
// reseting the password base on email since we already verified it
router.post('/profile/reset-password', async(req, res) => {
    try {
        const { password, email } = req.body

        const updatedPassword = await User.updateOne({email: email}, {password: password}) // updating the password
        if(!updatedPassword) return res.status(400).json({ error : "can't update the password!"})

        res.status(200).json({ message : 'updated tha password!'})
    } catch (error) {
        console.log("Error in the /profile/reset-password controller", error)
        res.status(500).json({ error : 'internal server error'})
    }
})

//

// follow someone or remove follow
router.post('/profile/follow', ensureAuthenticated, async (req, res) => {
    try {
        const { id } = req.body
        const senderId = req.user._id

        if(!id) return res.status(400).json({ error : "failed to follow, error" })

        const beingfollowed = await User.findOne({_id: id})
        const theFollower = await User.findOne({_id: senderId})

        if (!beingfollowed || !theFollower) return res.status(400).json({ error : "you or your following doesn't exist in the db" })

        await beingfollowed.followers.push(senderId)
        await theFollower.following.push(id)

        Promise.all([ await beingfollowed.save(), await theFollower.save()]).catch(err => {
            console.log(" error in the promise all profile/follow controller")
            res.status(400).json({ error : "failed to follow error" })
        })

        // it should also send the updated followers count of beingfollowed so we can update the client without asking the database for data again
        res.status(200).json({ message : "successfully followed"})
    } catch (error) {
        console.log("error on /profile/follow controller", error.message)
        res.status(500).json({ error : "internal server error"})
    }
})

router.post('/profile/unfollow', ensureAuthenticated, async(req, res) => {
    try {
        const { id } = req.body
        const senderId = req.user?._id

        const beingunfollow = await User.updateOne(
            { _id: id }, 
            { $pull: { followers: senderId } }
        )
        const theunfollower = await User.updateOne(
            { _id: senderId },
            { $pull: { following: id} }
        )

        if(!beingunfollow || !theunfollower) return res.status(400).json({ error : "failed to follow" })

        res.status(200).json({ message : "successfully unfollowed"})
    } catch (error) {
        console.log(" error in the /profile/unfollow controller", error)
        res.status(500).json({ error : 'internal server error'})
    }
})

// GETTING THE PROFILE 
// just get because we don't really need anything to have in the body
router.get('/profile/:id', async(req, res) => {
    try {
        // didn't work yet but i feel like because we haven't registered any shema in blog
        // still in development "Schema hasn't been registered for model "Blog"" error
        // we also need to have the count of following and followers
        const { id } = req.params

        // we are making the id string to objectId because mongoDb doesn't accept string for _id of objectID
        const objectId = new mongoose.Types.ObjectId(id);

        const user = await User.findOne({_id: objectId}, {password: 0}).populate("Blogs")

        if(!user) return res.status(400).json({ error : "User does not exist" })


        res.status(200).json(user)
    } catch (error) {
        console.log("error in the profile/:id", error.message)
        res.status(500).json({ error : "internal server"})
    }
})

export default router