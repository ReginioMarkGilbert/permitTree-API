// models/Application.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'In Progress'
    }
});

module.exports = applicationSchema;
