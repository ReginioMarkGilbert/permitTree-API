const mongoose = require('mongoose');
const applicationSchema = require('../schema/Application');

const applicationModel = mongoose.model('Application', applicationSchema);

module.exports = applicationModel;