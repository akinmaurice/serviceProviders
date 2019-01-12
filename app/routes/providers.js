const express = require('express');

const router = express.Router();

const providerController = require('../controllers/providers');


router.get(
    '/services/:service',
    providerController.getProvidersServices
);


router.get(
    '/location/:location',
    providerController.getProvidersLocation
);


router.post(
    '/',
    providerController.createProvider
);


module.exports = router;
