const createProvider = require('./create.provider');
const getProvidersServices = require('./get.providers.services');
const getProvidersLocation = require('./get.providers.location');

const providerController = {
    createProvider,
    getProvidersServices,
    getProvidersLocation
};

module.exports = providerController;
