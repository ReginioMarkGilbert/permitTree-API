
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
    },
    brand: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    model: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    serialNumber: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    dateOfAcquisition: { 
        type: Date, 
        required: true 
    },
    powerOutput: { 
        type: mongoose.Schema.Types.Mixed, 
        required: true 
    }
});

module.exports = applicationSchema;
