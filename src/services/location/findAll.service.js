const models = require('../../models/');

/**
 * finds and returns location for a given filter.
 * @param filter {object} mongoose filter
 * @returns {Promise<*>}
 */
const findAll = async (filter) => {
    return await models.location.find(filter);
};

module.exports = findAll;