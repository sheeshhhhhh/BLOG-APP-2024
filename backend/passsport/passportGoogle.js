import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
import User from '../models/UserModel.js'

dotenv.config()

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/auth/google/callback",
    scope: ['email', 'profile']
}, async function(accessToken, refreshToken, profile, cb) {
    // need to implement saving to the data base so that he only needs to login
    const user = await User.findOne({id: profile.id})

    if(!user) {
        const newAccount = new User({
            id: profile.id,
            displayName: profile.displayName,
            avatarUrl: profile.photos[0].value,
        })
        if (!newAccount) return cb(err, undefined)
        
        await newAccount.save()
        return cb(null, newAccount)
    }
    return cb(null, user)
}))
