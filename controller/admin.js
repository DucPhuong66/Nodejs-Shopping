const Product = require("../model/product-model");
const User = require("../model/user-model");
const bcrypt = require("bcryptjs");
const product = require("./product");

module.exports = {
    manage: async function(req, res){
        await User.find({}, async function(err, userdata){
            await Product.find({}, function(err, productdata) {
                res.render('pages/dashboard',{
                    title: 'Dashboard',
                    users: userdata, // users from database
                    products: productdata,
                    user: req.user // contain user cookie
                });
            });
        });
    },
    // ------< USER >---------
    // render page edit
    editUserPage: async function(req, res) {
        await User.findOne({_id: req.params.id}, function(err, data){
            res.render('pages/edit-user', {
                title: 'Edit user',
                user: data,
            });
        });
    },
    //
    removeUser: async function(req, res) {
        await User.deleteOne({_id: req.params.id}, function(err, rs) {
            if (err) {
                console.log(err);
            } else {
                req.flash('success_msg', 'User deleted')
                res.redirect('/dashboard')
            }
        });
    },
    // update user info
    updateUser: async function (req, res) {
        if (! req.file) {
            await User.findByIdAndUpdate({_id: req.params.id}, 
                {
                    name: req.body.name,
                    location: req.body.location,
                    phone: req.body.phone,
                    role: req.body.role
                }, function (err) {
                    if (err) res.json(err);
                    else {
                        req.flash('success_msg', 'User updated');
                        res.redirect('/dashboard');
                    }
                });
        } else {
            await User.findByIdAndUpdate({_id: req.params.id}, 
                {
                    name: req.body.name,
                    location: req.body.location,
                    phone: req.body.phone,
                    role: req.body.role,
                    image: '/'.concat(req.file.path.replace(/\\/g,'/'))
                }, function (err) {
                    if (err) res.json(err);
                    else {
                        req.flash('success_msg', 'User updated');
                        res.redirect('/dashboard');
                    }
                });
        }
    },
    // add page render
    addPage: function(req, res) {
        res.render('pages/add-user', {title: 'Add user'});
    },
    // add user post
    addUser: function(req, res){
        const { name, phone, email, role,location, password } = req.body;
        let errors = [];

        if (!name || !phone || !role || !email || !location || !password ) {
            errors.push({msg: 'Please enter all fields'});
        }

        if (password.length < 6) {
            errors.push({msg: 'Password must be at least 6 characters'});
        }

        if (errors.length > 0) {
            res.render('pages/add-user', {
                title: 'Add user',
                errors,
                name,
                phone,
                email,
                role,
                location,
                password,
            });
        } else {
            User.findOne({ email: email} ).then(user => {
                if (user) {
                    errors.push({msg: 'Email already exists'});
                    res.render('pages/add-user', {
                        title: 'Add user',
                        errors,
                        name,
                        phone,
                        email,
                        role,
                        location,
                        password,
                    });
                } else {
                    const newUser = new User({
                        name,
                        phone,
                        email,
                        role,
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
                                        'Add user successfully'
                                    );
                                    res.redirect('/dashboard');
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
        }
    },
    // ------< PRODUCT >---------
    // render page edit
    editProductPage: async function(req, res) {
        await Product.findOne({_id: req.params.id}, function(err, data){
            res.render('pages/edit-product', {
                title: 'Edit product',
                product: data,
            });
        });
    },
    // update product info
    updateProduct: async function (req, res) {
        if (! req.file) {
            await Product.findByIdAndUpdate({_id: req.params.id}, 
                {
                    name: req.body.name,
                    price: req.body.price,
                    decription: req.body.decription,
                    type: req.body.type
                }, function (err) {
                    if (err) res.json(err);
                    else {
                        req.flash('success_msg', 'Product updated');
                        res.redirect('/dashboard');
                    }
                });
        } else {
            await Product.findByIdAndUpdate({_id: req.params.id}, 
                {
                    name: req.body.name,
                    price: req.body.price,
                    decription: req.body.decription,
                    type: req.body.type,
                    image: req.file.path.replace(/\\/g,'/')
                }, function (err) {
                    if (err) res.json(err);
                    else {
                        req.flash('success_msg', 'Product updated');
                        res.redirect('/dashboard');
                    }
                });
        }
    },
    //
    removeProduct: async function(req, res) {
        await Product.deleteOne({_id: req.params.id}, function(err, rs) {
            if (err) {
                console.log(err);
            } else {
                req.flash('success_msg', 'Product deleted')
                res.redirect('/dashboard')
            }
        });
    },

    //render page add product
    addProductPage: async function (req, res) {
        res.render('pages/add-product', {title: 'Add product'});
    },

    //
    addProduct: function(req, res){
        const { name, price, decription, type } = req.body;
        let errors = [];

        if (!name || !price || !decription || !type ) {
            errors.push({msg: 'Please enter all fields'});
        }

        if (decription.length < 6) {
            errors.push({msg: 'Password must be at least 6 characters'});
        }

        if (errors.length > 0) {
            res.render('pages/add-product', {
                title: 'Add product',
                errors,
                name,
                price,
                decription,
                type
            });
        } else {
            const newProduct = new Product({
                name,
                price,
                decription,
                type,
                image: '/'.concat(req.file.path.replace(/\\/g,'/'))
            });
            newProduct
                .save()
                .then(product => {
                    req.flash(
                        'success_msg',
                        'Add user successfully'
                    );
                    res.redirect('/dashboard');
                })
                .catch(err => console.log(err));
        }
    }
}