const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    _id: String,

    name: String,
    description: String,
    time: String,
    date: String,

    possitions: Array,
});

module.exports = mongoose.model('events', eventSchema);