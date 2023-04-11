const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const userSchema = new mongoose.Schema({
    First_name: {
        type: String,
        required: true
    },
    Last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },   
});

module.exports = mongoose.model('User', userSchema);
    