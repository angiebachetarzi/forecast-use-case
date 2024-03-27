const create = require('./create.service');
const update = require('./update.service');
const findOne = require('./findOne.service');
const findAll = require('./findAll.service');
const remove = require('./remove.service');

module.exports = {
    create,
    update,
    findOne,
    findAll,
    remove
};