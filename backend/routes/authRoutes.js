import express from 'express'
import passport from 'passport'
import bcrypt from 'bcrypt'
import User from '../models/UserModel.js';

const router = express.Router()

// google authentication
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: process.env.CLIENT_BASE_URL + '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(process.env.CLIENT_BASE_URL);
});


// credentials authentication

//login local passport js
router.post('/login', 
  passport.authenticate('local', {
    failureRedirect: process.env.CLIENT_BASE_URL + '/login'
  }), 
  (req, res) => {
    // after being done of the authentication we are going to redirect them
    res.status(200).json({ message: "login successfully"})
  }
)

// signup local passport js 
router.post('/signup', async (req, res, next) => {
  const { username, password, confirmPassword, email } = req.body
  if(!username || !password || !confirmPassword) return res.status(200).json({ error : "fill in all the fields!"})

  if (password !== confirmPassword) return res.status(200).json({ error : "Password and confirmPassword is different"})

  const hashedPassword = await bcrypt.hash(password, 8)
    // create the user that is store in the user varible
  const user = await User.create({
      username: username,
      displayName: username, // we are making the username as the default display name but we are gonna make a route to edit profile
      email: email || '',
      password: hashedPassword
  });

  if (!user) return res.status(400).json({ error : "failed to create Account"})

  // we are logging in the user
  req.login(user, function(err) {
    if (err) { return next(err); }
    res.status(200).json({ message : "successfully signed up user"})
  });
});

// logout can be use sigle handedly even though we implement multiple types of authentication
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if(err) return next(err)
    res.status(200).json("successfully logged out")
  }); // This will clear the login session, regardless of the authentication method used
});


// for the authcontext so we are always requesting the user if they are logged in 
// we need to asked the user because sometimes theyre seesion token is expired
router.get("/check", (req, res) => {
	if(req.isAuthenticated()) {
		res.send({ user: req.user })
	} else {
		res.send({ user: null })
	}
});
export default router