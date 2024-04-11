const models = require('../../models');
const service = require('../../services');
const { isValidLatitude, isValidLongitude } = require('../../utils/helpers');
const { successResponse, errorResponse, logger } = require('../../utils/');
const { agenda } = require('../../jobs/updateTemperatures.jobs');

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

        //if body contains lon and/or lat, but no slug, generate error
        //changing lon and/or lat while keeping same slug will create a discrepancy in temperatures related to slug
        //temps are linked to lon and lat, so changing them makes temps obsolete
        if (!location.slug) {
            errorResponse(res, 400, 'Updating location is not allowed without changing slug.');
            return;
        }

        if (location.slug == params.slug) {
            errorResponse(res, 400, 'Updating location slug implies a new slug.');
            return;
        }

        //find corresponding location
        const location2Update = await service.findOne(models.location, { slug: params.slug });
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
        
        //persist location in the database
        const updatedLocation = await service.update(models.location, { slug: params.slug }, location);
        
        //respond with error in case persisting failed
        if (!updatedLocation) {
            errorResponse(res, 500, 'Failed to update location. Please check your input.');
            return;
        }

        //if lat and/or lon changed, run cron job (considered as a creation)
        agenda.now('Update temperatures daily');
        
        successResponse(res, 200, `Successfully updated location with slug ${params.slug}`);
        
    } catch (error) {
        logger.error('controllers/location/update.js', error);
        errorResponse(res, 500, 'Something went wrong while creating the location.');
    }
};

module.exports = update;