const express = require('express');
const router = express.Router();

// Getting all
router.get('/', (req, res) => {
    res.send('Hello World')
});

// Getting One
router.get('/:id', (req, res) => {

});

// Creating One
router.post('/', (req, res) => {

});

module.exports = router