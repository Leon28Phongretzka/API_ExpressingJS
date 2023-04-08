const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Account', accountSchema);
