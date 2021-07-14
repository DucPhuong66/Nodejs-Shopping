const User = require("../model/user-model");
const bcrypt = require("bcryptjs");
const passport = require("passport");


module.exports = {
    // Register Page
    registerPage: function (req, res) {
        res.render('pages/register', {title: 'Register'});
    },

    // Login Page
    loginPage: function (req, res) {
        res.render('pages/login', {title: 'Login'});
    },

    // Register
    register: function(req, res) {
        const { name, phone, email, location, password, password2 } = req.body;
        let errors = [];

        if (!name || !phone || !email || !location || !password || !password2) {
            errors.push({msg: 'Please enter all fields'});
        }

        if (password != password2) {
            errors.push({msg: 'Passwords do not match'});
        }

        if (password.length < 6) {
            errors.push({msg: 'Password must be at least 6 characters'});
        }

        if (errors.length > 0) {
            res.render('pages/register', {
                title: 'Register',
                errors,
                name,
                phone,
                email,
                location,
                password,
                password2
            });
        } else {
            User.findOne({ email: email} ).then(user => {
                if (user) {
                    errors.push({msg: 'Email already exists'});
                    res.render('pages/register', {
                        title: 'Register',
                        errors,
                        name,
                        phone,
                        email,
                        location,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        phone,
                        email,
                        location,
                        password
                    });

                    // hash password before save 
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    req.flash(
                                        'success_msg',
                                        'You are now registered and can log in'
                                    );
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
        }
    },
    login: function(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    },
    logout: function(req, res) {
        req.session.destroy(function(err) {
            res.redirect('/users/login');
        })
    }
}