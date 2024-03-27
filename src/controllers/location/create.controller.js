const locationService = require('../../services/location/');
const { isURLSafe, isValidLatitude, isValidLongitude } = require('../../utils/helpers');
const { successResponse, errorResponse, logger } = require('../../utils/');

/**
 * creates new location
 * @param location {object} location object that was sent
 * @param res {object} response object
 * @returns new location id if success
 */
const create = async ({ body: location }, res) => {
    try {
        //check if mandatory fields are provided (slug, longitude and latitude)
        if (!location.slug) {
            errorResponse(res, 400, 'Location slug is required but was not provided.');
            return;
        }
        if (!location.longitude || !location.latitude) {
            errorResponse(res, 400, 'Both longitude and latitude must be provided.');
            return;
        }

        //check if slug is URL safe
        if (!isURLSafe(location.slug)) {
            errorResponse(res, 400, 'Location slug must be URL safe.');
            return;
        }

        //check if latitude and longitude are valid
        if (!isValidLongitude(location.longitude)) {
            errorResponse(res, 400, 'Invalid longtitude for location: Value must be between -180 and 180.');
            return;
        }
        if (!isValidLatitude(location.latitude)) {
            errorResponse(res, 400, 'Invalid latitude for location: Value must be between -90 and 90.');
            return;
        }
        
        //persist hackaton in the database
        const createdLocation = await locationService.create(location);
        
        //respond with error in case persisting failed
        if (!createdLocation) {
            errorResponse(res, 500, 'Failed to create new location. Please check your input.');
            return;
        }
        
        //respond with the location ID
        successResponse(res, 200, { locationID: createdLocation.id });
        
    } catch (error) {
        //case of duplicate slug attempt
        if (error.keyPattern && error.keyPattern.slug) {
            errorResponse(res, 400, 'Slug already exists for other location.');
        }
        logger.error('controllers/location/create.js', error);
        errorResponse(res, 500, 'Something went wrong while creating the location.');
    }
};

module.exports = create;