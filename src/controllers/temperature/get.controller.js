const models = require('../../models/');
const service = require('../../services');
const { successResponse, errorResponse, logger } = require('../../utils/');
const { isValidDateFormat } = require('../../utils/helpers');

/**
 * get a forecast for a location
 * @param req request containing slug of a location, start date and end date
 * @param res {object} response object
 * @returns forecast of days between start date and end date
 * with min and max temperature for each day
 */
const getAll = async (req, res) => {
    try {

        //check correct params
        if (!req.query.slug) {
            errorResponse(res, 404, 'Slug location missing in param.');
            return;
        }
        if (!req.query.startDate) {
            errorResponse(res, 404, 'Start date is missing.');
            return;
        }
        if(!isValidDateFormat(req.query.startDate)) {
            errorResponse(res, 400, 'Invalid format for date. Correct format is YYYY-MM-DD');
            return;
        }
        if (!req.query.endDate) {
            errorResponse(res, 404, 'End date is missing.');
            return;
        }
        if(!isValidDateFormat(req.query.endDate)) {
            errorResponse(res, 400, 'Invalid format for date. Correct format is YYYY-MM-DD');
            return;
        }

        //check that location exists
        const location = await service.findOne(models.location, { slug: req.query.slug });
        if (!location) {
            errorResponse(res, 404, `Location ${req.query.slug} not found.`);
            return;
        }

        //get temperatures from start date to end date
        const tempArray = await service.findAll(models.temperature, {
            location: location, day: {
                $gte: req.query.startDate,
                $lte: req.query.endDate
        }})

        console.log(tempArray)
        let forecast = []
        tempArray.forEach(temp => {
            forecast.push({
                'date': temp.day.toISOString().split('T')[0],
                'min-forecasted': Math.min(...temp.temperatures),
                'max-forecasted': Math.max(...temp.temperatures)
            })
        })
        
        successResponse(res, 200, { forecast });
        
    } catch (error) {
        logger.error('controllers/temperature/get.controller.js', error);
        errorResponse(res, 500, `Something went wrong while fetching forecast for location ${req.query.slug}.`);
    }
};

module.exports = getAll;