import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../models/UserModel.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

dotenv.config()

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(async function(user, done) {

  done(null, user);
});


passport.use(new LocalStrategy(async function(username, password, cb) {
    if (!username || !password) return cb(null, false, { message : "please fill in all the fields!"})

    const user = await User.findOne({username, username});

    if (!user) return cb(null, false, { message : "username doesn't exist!" })
    
    const correctPassword = await bcrypt.compareSync(password, user.password)

    if(!correctPassword) return cb(null, false, { message : "wrong password!"})

    return cb(null, user);
  }
));



  