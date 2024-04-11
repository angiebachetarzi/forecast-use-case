const Agenda = require('agenda');
const axios = require('axios');

const configs = require('../configs');
const models = require('../models')
const service = require('../services');

//connect to db
const mongoose = require('mongoose');
mongoose.connect(configs.mongoDB.uri, { useNewUrlParser: true, useUnifiedTopology: true });

const agenda = new Agenda({ db: { address: configs.mongoDB.uri } });

agenda
 .on('ready', () => console.log("Agenda started!"))
 .on('error', () => console.log("Agenda connection error!"));

/**
 * create the temperatures of each location for the span of 3 days
 */
agenda.define('Update temperatures daily', async (job) => {
    console.log('Running script...')
    try {
        //get all locations
        const locations = await service.findAll(models.location);

        for (const location of locations) {
            //check that location and date are not already in db
            const today = new Date();
            //doing this to only get dates, idc about the time
            today.setUTCHours(0, 0, 0, 0);

            const temperature = await service.findOne(models.temperature, { location: location.slug, day: today})
            //if it doesnt exist, create temperatures for today and the two next days
            if (!temperature) {
                //make axios call to 7timer API
                //1 request gives data on 3 days
                const response = await axios.get(`https://www.7timer.info/bin/astro.php?lon=${location.longitude}&lat=${location.latitude}&ac=0&unit=metric&output=json&tz
                shift=0`);

                //create array of only temperatures for the 3 days
                const tempCurrent = response.data.dataseries.slice(0, 7).map(obj => obj.temp2m);
                const tempNextDay = response.data.dataseries.slice(8, 15).map(obj => obj.temp2m);
                const tempNextNextDay = response.data.dataseries.slice(16, 23).map(obj => obj.temp2m);

                //create corresponding temperature documents
                const nextDay = new Date(today);
                nextDay.setDate(today.getDate() + 1);
                nextDay.setUTCHours(0, 0, 0, 0);
                const nextNextDay = new Date(nextDay);
                nextNextDay.setDate(nextDay.getDate() + 1);
                nextNextDay.setUTCHours(0, 0, 0, 0);

                const tempTodayDoc = await service.create(models.temperature, {
                    location: location.slug,
                    day: today,
                    temperatures: tempCurrent
                });
                const tempNextDayDoc = await service.create(models.temperature, {
                    location: location.slug,
                    day: nextDay,
                    temperatures: tempNextDay
                });
                const tempNextNextDoc = await service.create(models.temperature, {
                    location: location.slug,
                    day: nextNextDay,
                    temperatures: tempNextNextDay
                });

                //respond with error in case persisting failed
                if (!tempTodayDoc || !tempNextDayDoc || !tempNextNextDoc) {
                    errorResponse(res, 500, 'Failed to create new temperatures.');
                    return;
                }

                console.log(`Updated temperatures for location ${location.slug} for following days: ${today}, ${nextDay}, ${nextNextDay}`);
            }
        }
    } catch (error) {
        console.error('Error updating temperatures:', error);
    }
    console.log('Script terminated.')

    job.repeatEvery("0 0 * * *", {
        //skipImmediate skips the first run, in case the app is launched before the cron is suposed to run
        skipImmediate: true,
      });
    await job.save();
});

//start agenda and schedule the job to run every day at midnight (so that I always get 3 days)
//with each new location, a set of temperature documents need to be created
(async () => {
    await agenda.start();
})();

module.exports = { agenda };