const mongoose = require('mongoose');
const spotify_API = require('../spotify_API');
const spotify_API_follower = require('../spotify_API_follower');

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
    spotify_stream_count:
    {
        type: String,
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
