const models = require('../../models');
const service = require('../../services');
const { successResponse, errorResponse, logger } = require('../../utils/');

/**
 * list locations
 * @param res {object} response object
 * @returns list of all locations
 */
const getAll = async (_, res) => {
    try {
        //fetch all locations in batches
        const batchSize = 1000; // Number of documents to fetch per batch
        let locations = [];
        let pageNumber = 1;

        while (true) {
            const skip = (pageNumber - 1) * batchSize;
            const pipeline = [
                { $skip: skip },
                { $limit: batchSize }
            ];

            const batchLocations = await service.aggregate(models.location, pipeline);
            if (batchLocations.length === 0) {
                break;
            }

            locations = locations.concat(batchLocations);
            pageNumber++;
        }
        
        successResponse(res, 200, { locations });
        
    } catch (error) {
        logger.error('controllers/location/getAll.controller.js', error);
        errorResponse(res, 500, 'Something went wrong while fetching all locations.');
    }
};

module.exports = getAll;