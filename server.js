const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

// connect use .env
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

app.listen(8000, () => {
    console.log("Server is running");
})


