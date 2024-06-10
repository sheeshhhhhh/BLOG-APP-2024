import express from 'express'
import multer from 'multer'
import { ensureAuthenticated } from '../Middleware/ensureAuthenticated.js'
import Blog from '../models/BlogModel.js'
import User from '../models/UserModel.js'
import Comment from '../models/CommentModel.js'

// dest stand for destination of the files  
// ref: https://www.npmjs.com/package/multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, 'backend/routes/upload/HeaderPhoto')
    },
    filename: function(req, file, cb) {
        return cb (null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

const router = express.Router()

router.post('/create', ensureAuthenticated, upload.single('HeaderPhoto'), async (req, res) => {
    try {
        const { title, HashTag, description, body } = req.body
        const { filename } = req.body
        const { user } = req
        
        console.log(req.body)

        const completeFilename = 'http://localhost:5000/Headeruploads/' + filename

        const createblog = await Blog.create({
            Author: user?._id,
            title,
            HashTag,
            description,
            body,
            HeaderPhoto: completeFilename,
            Comments: []
        })

        if(!createblog) return res.status(400).json("error in creating Blog")
        const updateUserBlog = await User.updateOne({_id: user?._id}, {
            $push: {
                Blogs: createblog?._id
            }
        })

        if (!updateUserBlog) return res.status(400).json({ error : "failed to save the blog id to the user account"})
        res.status(200).json(createblog._id)
    } catch (error) {
        console.log("error in the blog/create route", error.message)
        res.status(500).json("internal server error")
    } 
})

//this is for explore and can also use for searching but mainly use for getting blogs with pagination
router.get('/getblogs/:search', async(req, res) => {
    try {
        const { search } = req.params
        const { page } = req.body

        // skip is subtracting 1 into page because it starts with 0. 1 page is suppoed to be 0 and times 15 becuase that was the skip page 1 supposed to have no skip
        // page 2 has skip so 2 - 1 = 1 * 15 = 15. so means skip 15 which means skip page 1.
        let skip = (page - 1) * 15  
        let blogs = null
        // this makes it so that it is not case sensitive
        const searchregex = new RegExp(search, 'i')

        if(search) {
            const searchblogs = await Blog.find({
                $or: [
                   { HashTag: { $regex: searchregex}},
                   { title: { $regex: searchregex }} 
                ]
            })
            .limit(15)
            .skip(skip)
            .sort({ createAt: -1})
            .select('-Comments')
            .populate({
                path: 'Author',
                select: 'displayName avatarUrl _id'
            })

            blogs = searchblogs
        } else {
            const getblogs = await Blog.find()
            .limit(15)
            .skip(skip)
            .sort({ createdAt: -1})
            .select('-Comments')
            .populate({
                path: 'Author',
                select: 'displayName avatarUrl _id'
            })
            blogs = getblogs
        }

        console.log(blogs)
        res.status(200).json(blogs)
    } catch (error) {
        console.log("error in the /searchblog controller", error.message)
    }
})

//this is responsible for getting blogs without search 
router.post('/getallblogs', async (req, res) => {
    try {
        const { page } = req.body

        let limit = 15
        let skip = (page - 1) * limit

        const allblogs = await Blog.find()
        .skip(skip)
        .sort({ createdAt: -1})
        .select('-Comments')
        .populate({
            path: 'Author',
            select: 'displayName avatarUrl _id'
        })

        res.status(200).json(allblogs)
    } catch (error) {
        res.status(500).json({ error : 'internal server error'})
    }
})

// this is for getting individual blogs
router.get('/getblog/:id', async (req, res) => {
    try {
        const { id } = req.params

        if (!id) return res.status(400).json({ error : "incomplete URL"})
         
        const blog = await Blog.findOne({_id: id}).populate({
            path: "Author",
            select: '_id displayName avatarUrl'
        }).populate({
            path: "Comments",
            populate: {
                path: "User",
                select: "_id displayName avatarUrl"
            }
        })
        if(!blog) return res.status(400).json({ error : "Blog does not exist!"})

        res.status(200).json({blog: blog})
    } catch (error) {
        console.log("error in the /getblog/:id route", error.message)
        res.status(500).json({ error : "internal server error"})
    }
})



router.get('/getchildcomment/:id', async (req, res) => {
    try {
        const {  id } = req.params

        if (!id) return res.status(400).json({ error : "can't find params id"})
        
        const childcomments = await Comment.findOne({_id: id}).populate({
            path: "childComments",
            populate: {
                path: "User"
            }
        })

        console.log(childcomments)
        if(!childcomments) return res.status(400).json({ error : 'replies dont exist '})

        res.status(200).json(childcomments)
    } catch (error) {
        console.log('erron in the /getchildcomment/:id', error)
        res.status(500).json({ error : 'internal server error'})
    }
})
// create a comment 
// and child comment responding to a comment 
router.post('/comment/:blogid', ensureAuthenticated ,async (req, res) => {
    try {
        const { blogid } = req.params
        const { type, body } = req.body
        const user = req.user
        
        if (!type || !body) return res.status.json({ error : "failed to comment. Try again"})

        const blog = await Blog.findOne({_id: blogid})
        if(!blog) return res.status(400).json({ error : "can't find blog" })
        const newComment = new Comment({
            type,
            User: user._id,
            body,
            childComments: []
        })

        if(!newComment) return res.status(400).json({ error : "failed to comment. Try again"})
        blog.Comments.push(newComment?._id)

        Promise.all([await newComment.save(),await blog.save()]).catch(err => {
            console.log(" error in the promise all comment/:id controller")
            res.status(400).json({ error : "failed to comment" })
        })

        if(!newComment || !user) return res.status(400).json({error : "your comment will appear later"})

        res.status(200).json({
            newComment: newComment,
            User: user
        })        
    } catch (error) {
        console.log("error in the /comment/:blogid route", error.message)
        res.status(500).json({ error : "internal server error"})
    }
})

router.post('/childcomment/:commentid', ensureAuthenticated ,async (req,res) => {
    try {
        const { comment, type} = req.body
        const userid = req.user._id
        const { commentid } = req.params 

        if (!comment || !type || !userid || !commentid) return res.status(400).json({ error : "something is missing"})

        const ParentComment = await Comment.findOne({_id: userid})

        if (!ParentComment) return res.status(400).json({ error :  "The comment does not exist!" })

        const newChildComment = new Comment({
            type,
            User: userid,
            body: comment,
            parentComment: ParentComment?._id
        })

        if (!newChildComment) return res.status(400).json({ error : "Failed to create Comment!"})

        await ParentComment.childComments.push(newChildComment?._id)

        Promise.all([await newChildComment.save(), await ParentComment.save()]).catch(err => {
            console.log(" error in the promise all /childcomment/:commentid", err)
            res.status(400).json({ error : "failed to comment error" })
        })
        
        res.status(200).json({ message : "successfully commented!"})
    } catch (error) {
        console.log({ error : "Error in the /childcomment/:comment id", error})
        res.status(500).json({ error : "internal server error"})
    }
})
// create that deletes the blog if they want to
router.post('/deleteblog/:blogid', ensureAuthenticated, async (req, res) => {
    try {
        const { blogid } = body.params
        const userid = req.user?._id

        if (!blogid || !userid) return res.status(400).json({ error : "can't delete!"})

        const blog = await Blog.findOne({_id: blogid, Author: userid})

        if (!blog) return res.status(400).json({ error : "can't find blog!"})

        await Blog.deleteOne({_id: blog?._id}).catch(err => {
            return res.status(400).json({ error : "failed to delete blog"})
        })

        res.status(200).json({ message : "blog deleted!"})
    } catch (error) {
        console.log({ error : "error in the /deleteblog/:blogid", error})
        res.status(500).json({ error : "internal server error"})
    }
})
// create something that edits the blog if they want to

export default router