const mongoose = require('mongoose');
const { Schema } = mongoose;
const locationSchema = require('./location.model.js')

const temperatureSchema = new Schema({
    location: locationSchema,
    day: Date,
    temperatures: [Number]
});

module.exports = temperatureSchema;