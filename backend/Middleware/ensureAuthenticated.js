export async function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect(process.env.CLIENT_BASE_URL + "/login")
    // can we have a choice to put in another params as search params 
    // so that we can display certain messages
}