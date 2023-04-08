const express = require('express');
const { db } = require('../models/subscriber');
const router = express.Router();
const Subscriber = require('../models/subscriber');
const spotifyWebAPI = require('spotify-web-api-node');


const spotifyAPI = new spotifyWebAPI({
    clientId: process.env.MY_CLIENT_ID,
    clientSecret: process.env.MY_CLIENT_SECRET,
});

require('dotenv').config();

// Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One
router.get('/:id',getSubscriber, (req, res) => {
    res.json(res.subscriber)
});

// Searching One by name use GET method
router.get('/search/:name', async (req, res) => {
    try {
        const subscriber = await Subscriber.find({ name: req.params.name });
        res.json(subscriber);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Creating One
router.post('/', findOne, async (req, res) => {
    console.log(req.body.name);
    const subscriber = new Subscriber({
        name: req.body.name,
        best_mv_name: req.body.best_mv_name,
        genre: req.body.genre,
        youtube_subscriber: req.body.youtube_subscriber,
        spotify_id: req.body.spotify_id,
        spotify_followers: spotify_followers(req.body.spotify_id),
        spotify_stream_count: req.body.spotify_stream_count,
        subscribeDate: req.body.subscribeDate
    })
    try{
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});

// Creating Many
router.post('/many', findOne, async (req, res) => {
    try{
        const newSubscriber = await Subscriber.insertMany(req.body);
        res.status(201).json(newSubscriber);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});


// Updating One
router.patch('/:id',getSubscriber, async (req, res) => {
    if(req.body.name != null)
    {
        res.subscriber.name = req.body.name;
    }
    if(req.body.best_mv_name != null)
    {
        res.subscriber.best_mv_name = req.body.best_mv_name;
    }
    if(req.body.best_mv_name != null)
    {
        res.subscriber.genre = req.body.genre;
    }
    try{
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber)
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});

// Updating All Spotify Monthly Stream Count
// router.patch('/updateall', async (req, res) => {
//     try{
//         const updatedSubscriber = await Subscriber.updateMany({}, 
//             { $set: { spotify_stream_count: req.body.spotify_stream_count } }
//         );
//         res.json(updatedSubscriber)
//     }
//     catch(err){
//         res.status(500).json({ message: err.message });
//     }
// });

// Deleting One
router.delete('/:id',getSubscriber, async (req, res) => {
    try{
        await res.subscriber.deleteOne();
        res.json({ message: 'Deleted Subscriber' });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});

// Deleting All
router.delete('/delall', async (req, res) => {
    try{
        await Subscriber.deleteMany();
        res.json({ message: 'Deleted All Subscribers' });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
});


// controller
async function getSubscriber(req, res, next)
{
    let subscriber
    try
    {
        subscriber = await Subscriber.findById(req.params.id);
        if(subscriber == null)
        {
            return res.status(404).json({ message: 'Cannot find subscriber' });
        }
    }
    catch(err)
    {
        return res.status(500).json({ message: err.message });
    }
    res.subscriber = subscriber
    next()
}

// Find Existed
async function findOne(req, res, next)
{
    try
    {
        const database = db;
        const collection = database.collection('subscribers');
        const filter = { name: req.body.name };
        const result = await collection.findOne(filter);
        if(result != null)
        {
            return res.status(400).json({ message: 'Duplicate' });
        }
        console.log('Document found:', result);
    }
    catch(err)
    {
        return res.status(500).json({ message: err.message });
    }
    next()
}

function spotify_followers(artist_name) {
    spotifyAPI.clientCredentialsGrant().then(
        function (data) {
            console.log('Login Successful!');
            spotifyAPI.setAccessToken(data.body['access_token']);

            spotifyAPI.getArtist(artist_name).then(
                function (data) {
                    console.log('Follower = ' + data.body.followers.total);
                    return data.body.followers.total;
                }
            );
        }
    );
}

module.exports = router