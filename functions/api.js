const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/applicationRoutes');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// const db = 'mongodb://localhost:27017/chainsawRegistration';
// const db = 'mongodb+srv://markgilbert:6jSZ1vskFMjO6VH5@permittreeprototypedb.v3cxfds.mongodb.net/?retryWrites=true&w=majority&appName=PermittreePrototypeDB'
const db = 'mongodb+srv://starlord:njlbGzq9LKbrw0yO@cluster0.cqtwu1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

app.use(cors({
    origin: 'https://permittree-prototype.netlify.app', // or use '*' to allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);