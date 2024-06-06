const mongoose = require('mongoose');
const counterSchema = require('../schema/counter');

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;