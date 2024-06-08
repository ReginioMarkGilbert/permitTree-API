const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/applicationRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// const db = 'mongodb+srv://starlord:njlbGzq9LKbrw0yO@cluster0.cqtwu1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const db = 'mongodb+srv://markgilbert:TwkMFmLo9mSWxZeW@permittreeprototypedb.v3cxfds.mongodb.net/?retryWrites=true&w=majority&appName=PermittreePrototypeDB'

const corsOptions = {
    origin: 'https://permittree-prototype.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/api', router);

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://permittree-prototype.netlify.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

router.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://permittree-prototype.netlify.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.send();
});

module.exports.handler = serverless(app);
