import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'
import { fileURLToPath } from 'url';
import { dirname } from 'path'
import './passsport/passportGoogle.js'
import './passsport/passportLocal.js'

import userRoutes from './routes/UserRoutes.js'
import authRoutes from './routes/authRoutes.js'
import BlogRoutes from './routes/BlogRoutes.js'

import connectToDB from './connectToDB/connectToDB.js'

// this is use to get absulute path because we are trying to make upload static so that we can 
// load the data in web
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000
dotenv.config()

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
app.use(passport.initialize())
app.use(passport.session())
// add passport.use(passport.session()) if we are gonna use express sessions
app.use(express.json())


app.use('/uploads' ,express.static(__dirname + '/routes/upload/profile'))
app.use('/Headeruploads', express.static(__dirname + '/routes/upload/HeaderPhoto'))
app.use('/Homeuploads', express.static(__dirname + '/routes/upload/HomePhoto'))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/blog", BlogRoutes)


app.get("/gethomeimages" ,(req, res) => {

    const listofimages = 'MayonVolcano.jpg'

    res.status(200).json(listofimages)
})

app.listen(PORT, (req, res) => {
    console.log("server is PORT 5000")
    connectToDB()
})
