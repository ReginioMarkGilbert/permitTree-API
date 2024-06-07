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
    origin: ['https://permittree-prototype.netlify.app', 'http://localhost:8888'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use('/.netlify/functions/api', router);

exports.handler = async (event, context) => {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": event.headers.origin || "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Credentials": "true"
            },
            body: JSON.stringify({})
        };
    }

    if (event.httpMethod === 'POST') {
        try {
            const data = JSON.parse(event.body);
            const newApplication = new Application(data);
            await newApplication.save();

            return {
                statusCode: 201,
                headers: {
                    "Access-Control-Allow-Origin": event.headers.origin || "*",
                    "Access-Control-Allow-Credentials": "true"
                },
                body: JSON.stringify({ message: 'Application created successfully' })
            };
        } catch (error) {
            return {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": event.headers.origin || "*",
                    "Access-Control-Allow-Credentials": "true"
                },
                body: JSON.stringify({ error: 'Failed to create application' })
            };
        }
    }

    return {
        statusCode: 405,
        headers: {
            "Access-Control-Allow-Origin": event.headers.origin || "*",
            "Access-Control-Allow-Credentials": "true"
        },
        body: JSON.stringify({ error: 'Method not allowed' })
    };
};

module.exports.handler = serverless(app);
