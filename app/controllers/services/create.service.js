const Q = require('q');
const moment = require('moment');
const slug = require('slugs');
const uuidv1 = require('uuid/v1');
const checkRequestBody = require('../../utils/request.body.verifier');
const query = require('../../queries');
const db = require('../../../config/database');


const checkRequest = (body) => {
    const defer = Q.defer();
    try {
        const error = checkRequestBody(body, [
            'service_title',
            'description'
        ]);
        if (error) {
            defer.reject({
                code: 400,
                msg: error
            });
        } else {
            defer.resolve(true);
        }
    } catch (e) {
        defer.reject({
            code: 400,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


const verifyService = async(service_title) => {
    const defer = Q.defer();
    try {
        const service = await db.queryAsync(query.getServiceByTitle, [ slug(service_title) ]);
        if (service.length > 0) {
            defer.reject({
                code: 409,
                msg: 'A service with that name exists already'
            });
        } else {
            defer.resolve(true);
        }
    } catch (e) {
        logger.error('Verify-Service-Email-Error', e);
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


const saveService = async(body) => {
    const defer = Q.defer();
    try {
        const {
            service_title,
            description
        } = body;
        await db.queryAsync(
            query.createService,
            [
                uuidv1(),
                slug(service_title),
                description,
                moment().format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD')
            ]
        );
        defer.resolve(true);
    } catch (e) {
        logger.error('Add-Service-Error', e);
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


async function createService(req, res) {
    try {
        const { body } = req;
        const { service_title } = body;
        await checkRequest(body);
        await verifyService(service_title);
        await saveService(body);
        res.status(201).json({
            message: 'Service created'
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


module.exports = createService;
