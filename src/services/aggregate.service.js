/**
 * aggregate data through pipeline (used for batching)
 * @param model {object} model of the collection (either location or temperature)
 * @param filter {object} mongoose pipeline
 * @returns {Promise<*>}
 */
const aggregate = async (model, pipeline) => {
    return await model.aggregate(pipeline);
};

module.exports = aggregate;