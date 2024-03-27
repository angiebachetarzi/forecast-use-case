const express = require('express');

//controllers
const controllers = require('./controllers');

//create router
const router = express.Router();

//location routes
router.post('/location', controllers.location.create);
router.put('/location/:slug', controllers.location.update);
router.get('/locations', controllers.location.getAll);
router.get('/location/:slug', controllers.location.get);
router.delete('/location/:slug', controllers.location.remove);

module.exports = router;