/**
 * finds and returns docuement for a given filter.
 * @param model {object} model of the collection (either location or temperature)
 * @param filter {object} mongoose filter
 * @returns {Promise<*>}
 */
const findAll = async (model, filter) => {
    return await model.find(filter);
};

module.exports = findAll;