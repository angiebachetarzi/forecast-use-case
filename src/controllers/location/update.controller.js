const locationService = require('../../services/location/');
const { isValidLatitude, isValidLongitude } = require('../../utils/helpers');
const { successResponse, errorResponse, logger } = require('../../utils/');

/**
 * updates an existing location
 * only longitude and latitude can be updated
 * @param location {object} location object with updated fields
 * @param res {object} response object
 * @returns success message if update ok
 */
const update = async ({ body: location, params }, res) => {
    try {

        //check correct param
        if (!params.slug) {
            errorResponse(res, 404, 'Slug location missing in param.');
            return;
        }

        //body must contain only longitude and/or latitude fields
        if (location.slug) {
            errorResponse(res, 400, 'Updating slug location is not allowed. Please remove slug from body.');
            return;
        }

        //find corresponding location
        const location2Update = await locationService.findOne({ slug: params.slug });
        if (!location2Update) {
            errorResponse(res, 404, `Location ${params.slug} not found.`);
            return;
        }

        //check if latitude and longitude are valid if present
        if (location.longitude && !isValidLongitude(location.longitude)) {
            errorResponse(res, 400, 'Invalid longtitude for location: Value must be between -180 and 180.');
            return;
        }
        if (location.latitude && !isValidLatitude(location.latitude)) {
            errorResponse(res, 400, 'Invalid latitude for location: Value must be between -90 and 90.');
            return;
        }
        
        //persist hackaton in the database
        const updatedLocation = await locationService.update({ slug: params.slug }, location);
        
        //respond with error in case persisting failed
        if (!updatedLocation) {
            errorResponse(res, 500, 'Failed to update location. Please check your input.');
            return;
        }
        
        successResponse(res, 200, 'Successfully updated location with slug ' + params.slug);
        
    } catch (error) {
        logger.error('controllers/location/update.js', error);
        errorResponse(res, 500, 'Something went wrong while creating the location.');
    }
};

module.exports = update;