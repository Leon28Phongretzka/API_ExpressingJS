const mongoose = require('mongoose');

require('dotenv').config();

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Account', accountSchema);
