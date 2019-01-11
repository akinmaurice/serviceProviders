const express = require('express');

const router = express.Router();

const serviceController = require('../controllers/services');


router.get(
    '/',
    serviceController.getServices
);


router.post(
    '/',
    serviceController.createService
);


module.exports = router;
