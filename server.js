// import express from 'express';
const express = require('express');
const userRoute = require('./Routes/userRoute.js');
const productRoute = require('./Routes/productRoute.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); 

const app = express();

//Routes
app.use(express.json());

//routers
app.use('/api', userRoute);
app.use('/api', productRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);// console.log('Server is running on port', process.env.PORT);
    });
}).catch((error) => {
    console.log("Connection failed", error)
})