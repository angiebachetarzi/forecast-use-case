const models = require('../../models');

/**
 * creates a new location in the database.
 * @param location {object} location that should be stored
 * @returns {Promise<void>}
 */
const createService = async (location) => {
    return await models.location.create(location);
};

module.exports = createService;