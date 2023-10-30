const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    age: {type: String, required: true },
    sex: {type: String, required: true},
    role: {type: String, required: true },
    facebook: {type: String, required: true }
}, {timestamps: true});

module.exports = mongoose.model('Person', personSchema);