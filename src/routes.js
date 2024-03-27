const express = require('express');

//controllers
const controllers = require('./controllers');

//create router
const router = express.Router();

//location routes
router.post('/location', controllers.location.create);
router.put('/location/:slug', controllers.location.update);

module.exports = router;