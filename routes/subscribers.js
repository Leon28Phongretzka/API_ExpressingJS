const express = require('express');
const { db } = require('../models/subscriber');
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
router.get('/:id',getSubscriber, (req, res) => {
    res.json(res.subscriber)
});

// Creating One
router.post('/', findOne, async (req, res) => {
    console.log(req.body.name);
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

// Updating One
router.put('/:id',getSubscriber, async (req, res) => {
    if(req.body.name != null)
    {
        res.subscriber.name = req.body.name;
    }
    if(req.body.subscriber != null)
    {
        res.subscriber.subscriber = req.body.subscriber;
    }
    try{
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }

});

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

// controller
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

module.exports = router