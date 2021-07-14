const express = require('express');
const router = express.Router();
const multer = require('multer');
const { ensureAuthenticated, ensureRole } = require('../config/auth');
// require controller
const indexController = require("../controller/index");
const admin = require("../controller/admin");
const { index } = require('../controller/product');
const { route } = require('./user');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// Home Page
router.get('/', indexController.home);

// Profile
router.get('/profile', ensureAuthenticated, indexController.profile);

// POST: update info 
router.post('/profile', upload.single('image'), indexController.updateInfo);

// GET: add a product to cart when add to cart
router.get('/add-to-cart/:id', indexController.addToCart);

// GET: cart contents
router.get('/cart', indexController.cartContent);

// GET: remove each row cart
router.get('/remove-cart-item/:id', indexController.removeCartItem);

// GET: checkout
router.get('/checkout',  ensureAuthenticated, indexController.checkoutPage);

// POST: checkout
router.post('/checkout', indexController.checkout);
 
// Dashboard 
router.get('/dashboard', ensureAuthenticated, ensureRole, admin.manage);



// ----------------------------------------------
//---------- User management
// render page edit user admin
router.get('/edit-user/:id', admin.editUserPage);

// POST: edit user
router.post('/edit-user/:id', upload.single('image'), admin.updateUser);

// admin remove user
router.get('/remove-user/:id', admin.removeUser);

// admin add user render page
router.get('/add-user', ensureAuthenticated, ensureRole, admin.addPage);

// POST: add user
router.post('/add-user', admin.addUser);

// ----------------------------------------------
//---------- Product management
router.get('/edit-product/:id', admin.editProductPage);

// POST: edit user
router.post('/edit-product/:id', upload.single('image'), admin.updateProduct);

// admin remove product
router.get('/remove-product/:id', admin.removeProduct);

// admin add user render page
router.get('/add-product', ensureAuthenticated, ensureRole, admin.addProductPage);

// POST: add user
router.post('/add-product', upload.single('img'), admin.addProduct);

module.exports = router;