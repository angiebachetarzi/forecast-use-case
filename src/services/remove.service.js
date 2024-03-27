/**
 * removes a document from a collection
 * @param model {object} model of the collection (either location or temperature)
 * @param fieldName {string} fieldName of filter
 * @param fieldValue {string} value of field
 * @returns {Promise<*>}
 */
const removeService = async (model, fieldName, fieldValue) => {
    const query = {};
    query[fieldName] = fieldValue;
    return await model.deleteOne(query);
};

module.exports = removeService;