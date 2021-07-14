const express = require("express");
const userRouter = express.Router();
const { forwardAuthenticated } = require("../config/auth");
const userController = require("../controller/user");


// Register page
userRouter.get('/register', forwardAuthenticated, userController.registerPage);

// Login page
userRouter.get('/login', forwardAuthenticated, userController.loginPage);

// Register
userRouter.post('/register', userController.register);

// Login
userRouter.post('/login', userController.login);

// Logout
userRouter.get('/logout', userController.logout);


// export user router
module.exports = userRouter;