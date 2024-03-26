const { server } = require('../configs/');
const logger = require('./logger');

/**
 * responds to a request with a formatted success message.
 * @param res {object} response object
 * @param code {number} HTTP code
 * @param payload {any} requested payload or success message
 */
const successResponse = (res, code = server.defaults.successCode, payload = server.defaults.successMessage) => {
    if (!res) {
        logger.error('utils/successResponse.js', 'No response object was provided.');
        return;
    }
    
    res.status(code).send({ ok: true, code, payload });
};

module.exports = successResponse;