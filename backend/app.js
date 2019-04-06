const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const postRoutes = require('./routes/posts');

const app = express();

mongoose.connect("mongodb+srv://ashok:n5RfjPNxHMMMr3Qm@cluster0-wryne.mongodb.net/test?retryWrites=true")
.then(() => {
    console.log('Connected to database.');
})
.catch(() => {
    console.log('Connection Failed!');
});
//n5RfjPNxHMMMr3Qm
//68.34.128.125
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT,     DELETE, OPTIONS");
    next();
});

app.use('/api/posts', postRoutes);

module.exports = app;