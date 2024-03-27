const models = require('../../models/');

/**
 * removes a location with a given slug from the database.
 * @param slug {string} given slug location
 * @returns {Promise<*>}
 */
const removeService = async (slug) => {
    return await models.location.deleteOne({ slug: slug });
};

module.exports = removeService;