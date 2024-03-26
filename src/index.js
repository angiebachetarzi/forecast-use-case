const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const configs = require('./configs');

const app = express();

//middlewares
app.use(bodyParser.urlencoded(configs.server.bodyParser.options));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

//connect to MongoDB and start server
mongoose
    .connect(configs.mongoDB.uri)
    .then(() => app.listen(configs.server.app.port))
    .then(() => console.log(`✅ Server is listening on port ${configs.server.app.port}...`))
    .catch(error => {
        console.log('❌ Failed to connect to MongoDB with error:\n');
        console.error(error);
    });