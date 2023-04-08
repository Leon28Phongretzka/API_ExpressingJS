const express = require('express');
const { db } = require('../models/account');
const router = express.Router();
const Account = require('../models/account');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Creating One account
router.post('/', (req, res) => {
    const account = new Account ({
        email: req.body.email,
    })

    const accessToken = jwt.sign(account, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });

    // try{
    //     const newaccount = await account.save();
    //     res.status(201).json(newaccount);
    // }
    // catch(err){
    //     res.status(400).json({ message: err.message });
    // }
});


    
module.exports = router