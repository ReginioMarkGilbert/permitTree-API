const mongoose = require('mongoose');
const treeDataSchema = require('../schema/treeData');

const treeDataModel = mongoose.model('TreeData', treeDataSchema);

module.exports = treeDataModel;

