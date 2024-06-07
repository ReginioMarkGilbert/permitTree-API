const mongoose = require('mongoose');
const counterSchema = require('../schema/counter');

const CounterModel = mongoose.model('Counter', counterSchema);

module.exports = CounterModel;