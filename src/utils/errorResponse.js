const { server } = require('../configs/');
const logger = require('./logger');

/**
 * responds to a request with a formatted error.
 * @param res {object} response object
 * @param code {number} HTTP code
 * @param message {string} error message
 */
const errorResponse = (res, code = server.defaults.errorCode, message = server.defaults.errorMessage) => {
    if (!res) {
        logger.error('utils/errorResponse.js', 'No response object provided.');
        return;
    }
    
    res.status(code).send({ ok: false, code, message });
};

module.exports = errorResponse;