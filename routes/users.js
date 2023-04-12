const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

let refTokens = [];

router.post('/', async (req, res) => {
    try {
        console.log(process.env.ACCESS_TOKEN_SECRET);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const token = generateAccessToken({ email: req.body.email });
        console.log(salt);
        console.log(hashedPassword);
        console.log(token);
        const user = new User({
            First_name: req.body.First_name,
            Last_name: req.body.Last_name,
            email: req.body.email,
            password: hashedPassword,
            token: token
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: "Err " + err.message });
    }
});

router.post('/login', async (req, res) => {
    const user = req.body;
    const token = generateAccessToken({ email: req.body.email });
    console.log(token);
    const refToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    console.log(refToken);
    refTokens.push(refToken);
    res.json({ accessToken: token, refreshToken: refToken });
  })

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return 
    {
        res.status(401).json({ message: "Err " + err.message });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, 
        (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

module.exports = router