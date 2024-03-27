const locationService = require('../../services/location/');
const { successResponse, errorResponse, logger } = require('../../utils/');

/**
 * get one location through slug
 * @param res {object} response object
 * @returns location if found
 */
const getAll = async ({params}, res) => {
    try {

        //check correct param
        if (!params.slug) {
            errorResponse(res, 404, 'Slug location missing in param.');
            return;
        }

        const location = await locationService.findOne({ slug: params.slug });
        if (!location) {
            errorResponse(res, 404, `Location ${params.slug} not found.`);
            return;
        }
        
        successResponse(res, 200, { location });
        
    } catch (error) {
        logger.error('controllers/location/get.controller.js', error);
        errorResponse(res, 500, 'Something went wrong while fetching location ${params.slug}.');
    }
};

module.exports = getAll;