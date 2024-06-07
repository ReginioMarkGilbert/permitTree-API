const mongoose = require('mongoose');
const { Schema } = mongoose;

const treeDataSchema = new Schema({
    date: { type: Date, required: true, unique: true },
    count: { type: Number, required: true }
});

// const TreeData = mongoose.model('TreeData', treeDataSchema);

module.exports = treeDataSchema;

