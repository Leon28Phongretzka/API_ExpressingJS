
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// connect use .env
mongoose.connect(process.env.DATABASE_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);


app.listen(8000, () => {
    console.log("Server is running");
})

// Export the router
module.exports = router;


