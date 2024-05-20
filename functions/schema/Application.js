// models/Application.js

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: 'In Progress' }
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
