/**
 * creates a new document in the collection
 * @param model {object} model of the collection (either location or temperature)
 * @param instance {object} instance that should be stored
 * @returns {Promise<void>}
 */
const createService = async (model, location) => {
    return await model.create(location);
};

module.exports = createService;