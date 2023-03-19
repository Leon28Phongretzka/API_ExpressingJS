const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');
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
router.get('/:id', (req, res) => {

});

// Creating One
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscriber: req.body.subscriber
    })
    try{
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
});

// Deleting One
router.delete('/:id', (req, res) => {

});

module.exports = router