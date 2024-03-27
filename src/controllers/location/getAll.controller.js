const locationService = require('../../services/location/');
const { successResponse, errorResponse, logger } = require('../../utils/');

/**
 * list locations
 * @param res {object} response object
 * @returns list of all locations
 */
const getAll = async (_, res) => {
    try {
        const locations = await locationService.findAll();
        
        successResponse(res, 200, { locations });
        
    } catch (error) {
        logger.error('controllers/location/getAll.controller.js', error);
        errorResponse(res, 500, 'Something went wrong while fetching all locations.');
    }
};

module.exports = getAll;