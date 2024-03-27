const models = require('../../models/');

/**
 * updates location for a given filter with a given update.
 * @param filter {object} mongoose filter
 * @param update {object} updated data
 * @returns {Promise<*>}
 */
const updateService = async (filter, update) => {
    return await models.location.updateOne(filter, update, { new: true, runValidators: true });
};

module.exports = updateService;