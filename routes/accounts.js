const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Account = require('../models/account');

require('dotenv').config();

const genToken = (account) => {
    return jwt.sign({
        id: account.id,
        name: account.name
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
}

const refToken = (account) => {
    return jwt.sign({
        id: account.id,
        name: account.name
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
}

router.post('/register', async (req, res) => {
    const { name, password } = req.body;
    try {
        const account = await Account.create({
            name,
            password
        });
        const token = genToken(account);
        const refreshToken = refToken(account);
        res.status(201).json({
            token,
            refreshToken
        });
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = router