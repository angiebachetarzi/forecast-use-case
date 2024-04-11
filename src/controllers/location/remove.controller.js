const models = require('../../models');
const service = require('../../services');
const { successResponse, errorResponse, logger } = require('../../utils/');

/**
 * removes the location with a slug given in params
 * @param params {object} slug location
 * @param res {object} response object
 * @returns {Promise<void>}
 */
const remove = async ({ params }, res) => {
    try {
        //check correct param
        if (!params.slug) {
            errorResponse(res, 404, 'Slug location missing in param.');
            return;
        }

        //find corresponding location
        const location2Delete = await service.findOne(models.location, { slug: params.slug });
        if (!location2Delete) {
            errorResponse(res, 404, `Location ${params.slug} not found.`);
            return;
        }

        const deletedLocation = await service.remove(models.location, 'slug', params.slug);
        
        //respond with error if the location could not be deleted
        if (!deletedLocation) {
            errorResponse(res, 500, 'Failed to delete location.');
            return;
        }
        
        successResponse(res, 200, `Successfully deleted location with slug ${params.slug}`);
        
    } catch (error) {
        logger.error('controllers/location/remove.js', error);
        respondWithError(res, 500, 'Something went wrong while fetching the location.');
    }
};

module.exports = remove;