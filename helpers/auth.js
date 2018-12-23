module.exports = {
    ensureAuthenticated : function (req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash("error","You Are Not Log In");
        res.redirect("/user/login");
    }
}