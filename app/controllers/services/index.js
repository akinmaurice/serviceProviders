const createService = require('./create.service');
const getServices = require('./get.services');

const serviceController = {
    createService,
    getServices
};


module.exports = serviceController;

