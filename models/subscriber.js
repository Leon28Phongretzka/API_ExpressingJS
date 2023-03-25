const mongoose = require('mongoose');

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
