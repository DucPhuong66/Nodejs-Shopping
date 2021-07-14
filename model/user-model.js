const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "User",
    },
    password: {
        type: String,
        require: true
    },
    image: {
        type: String,
    }
});


module.exports = mongoose.model('User', userSchema);