const mongoose = require('mongoose');
const treeDataSchema = require('../schema/treeData');

const TreeData = mongoose.model('TreeData', treeDataSchema);

module.exports = TreeData;