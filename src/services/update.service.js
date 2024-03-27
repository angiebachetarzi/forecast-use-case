/**
 * updates document for a given filter with a given update.
 * @param model {object} model of the collection (either location or temperature)
 * @param filter {object} mongoose filter
 * @param update {object} updated data
 * @returns {Promise<*>}
 */
const updateService = async (model, filter, update) => {
    return await model.updateOne(filter, update, { new: true, runValidators: true });
};

module.exports = updateService;