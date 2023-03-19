const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri = "mongodb+srv://phongretzka:Leon8Goretzka@cluster0.7g4zyfg.mongodb.net/?retryWrites=true&w=majority"


require('dotenv').config();

async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}

connect();
app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

app.listen(8000, () => {
    console.log("Server is running");
})


