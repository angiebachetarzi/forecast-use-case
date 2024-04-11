const keys = require('../../keys.js');

module.exports = {
    uri: `mongodb+srv://${keys.username}:${keys.password}@${keys.host}/db_fix`,
    options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
};