const mongoose = require('mongoose');

require('dotenv').config();

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    best_mv_name:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    youtube_subscriber:
    {
        type: String,
        required: true
    },
    spotify_id:
    {
        type: String,
        required: true
    },
    spotify_followers:
    {
        type: Number,
        required: true
    },
    subscribeDate:
    {
        type: Date,
        required: true,
        default: Date.now
    },
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
