module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please login to view that resource');
        res.redirect('/users/login');
    },

    ensureRole: function(req, res, next) {
        if(req.user.role == 'Admin') {
            return next();
        }
        req.flash('error_msg', 'Only admin can view that resource');
        res.redirect('/profile');
    },
    
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/dashboard');
    }
}