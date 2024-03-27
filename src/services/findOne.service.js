/**
 * finds and returns one document for a given filter.
 * @param model {object} model of the collection (either location or temperature)
 * @param filter {object} mongoose filter
 * @returns {Promise<*>}
 */
const findOne = async (model, filter) => {
    return await model.findOne(filter);
};

module.exports = findOne;