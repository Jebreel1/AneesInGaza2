const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    well: {type: String, required: true, default: 'Fine'},
    family: {type: String, required: true, default: 'Fine'},
    house: {type: String, required: true, default: 'Fine'},
    healthy: {type: String, required: true,  default: 'Fine'},
    time: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Member', memberSchema);