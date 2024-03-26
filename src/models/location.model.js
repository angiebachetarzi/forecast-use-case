const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = new Schema({
    latitude: Number,
    longitude: Number,
    slug: String,
});

module.exports = locationSchema;