const mongoose = require('mongoose');
const { Schema } = mongoose;

const temperatureSchema = new Schema({
    location: String, //location slug (unique so can act as id)
    day: Date,
    temperatures: [Number]
});

module.exports = temperatureSchema;