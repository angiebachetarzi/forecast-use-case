const models = require('../../models/');

/**
 * finds and returns one location for a given filter.
 * @param filter {object} mongoose filter
 * @returns {Promise<*>}
 */
const findOne = async (filter) => {
    return await models.location.findOne(filter);
};

module.exports = findOne;