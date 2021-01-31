const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    _id: String,

    name: String,
    details: String,
    time: String,
    date: String,
    banner: String,
    controllable: Boolean,

    people: Array,
});

module.exports = mongoose.model('events', eventSchema);