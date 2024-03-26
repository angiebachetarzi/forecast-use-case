const mongoose = require('mongoose');

const location = require('./location.model.js');
const temperature = require('./temperature.model.js');

module.exports = {
    location: mongoose.model('location', location),
    temperature: mongoose.model('temperature', temperature)
};