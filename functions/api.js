
const express = require('express');
const serverless = require('serverless-http');
const router = require('./routes/applicationRoutes');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = 'mongodb://localhost:27017/chainsawRegistration';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);