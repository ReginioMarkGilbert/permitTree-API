const mongoose = require('mongoose');
const notificationSchema = require('../schema/Notification');

const notificationModel = mongoose.model('Notification', notificationSchema);

module.exports = notificationModel;

