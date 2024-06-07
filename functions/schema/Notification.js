const mongoose = require('mongoose');
const { Schema } = mongoose;

const notificationSchema = new Schema({
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// const Notification = mongoose.model('Notification', notificationSchema);

module.exports = notificationSchema;
