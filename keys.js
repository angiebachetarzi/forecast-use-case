require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD
};