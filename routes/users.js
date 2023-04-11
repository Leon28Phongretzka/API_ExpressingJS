const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        console.log(process.env.ACCESS_TOKEN_SECRET);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const token = generateAccessToken({ email: req.body.email });
        console.log(salt);
        console.log(hashedPassword);
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

router.post('/login', authenticateToken, async (req, res) => {
    const user = { email: req.body.email, password: req.body.password };
    const accessToken = generateAccessToken(user);
    if(user == null) return res.sendStatus(401);
    try
    {
        // Check accessToken
        // if(await 
        if(await bcrypt.compare(req.body.password, user.password))
        {
            res.send("OK!");
        }
        else
        {
            res.send("Wrong Password");
        }
    }
    catch(err)
    {
        res.status(500).send();
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

module.exports = router