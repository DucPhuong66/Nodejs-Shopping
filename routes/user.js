const express = require('express');
const userRouter = express.Router();
const userController = require("../controller/user");
const { forwardAuthenticated } = require("../config/auth");


//Register page
userRouter.get('/register', forwardAuthenticated, userController.registerPage);

//login page
userRouter.get('/login', forwardAuthenticated, userController.loginPage)

//register 
userRouter.post('/register', userController.register)

//login
userRouter.post('/login', userController.login);

//logout
userRouter.get('/logout', userController.logout);


module.exports = userRouter;