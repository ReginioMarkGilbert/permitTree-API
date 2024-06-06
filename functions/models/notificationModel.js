const mongoose = require('mongoose');
const notificationSchema = require('../schema/Notification');

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;