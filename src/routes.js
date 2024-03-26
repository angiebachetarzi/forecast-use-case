const express = require('express');

//controllers
const controllers = require('./controllers');

//create router
const router = express.Router();

router.post('/location', controllers.location.create);

module.exports = router;