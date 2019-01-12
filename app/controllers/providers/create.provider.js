const Q = require('q');
const moment = require('moment');
const uuidv1 = require('uuid/v1');
const checkRequestBody = require('../../utils/request.body.verifier');
const query = require('../../queries');
const db = require('../../../config/database');


const checkRequest = (body) => {
    const defer = Q.defer();
    try {
        const error = checkRequestBody(body, [
            'full_name',
            'email',
            'phone_number',
            'city_location',
            'service'
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


const verifyService = async(service_id) => {
    const defer = Q.defer();
    try {
        const service = await db.queryAsync(query.getServiceById, [ service_id ]);
        if (service.length < 1) {
            defer.reject({
                code: 400,
                msg: 'Please provide a valid service id'
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


const verifyProvider = async(email, phone) => {
    const defer = Q.defer();
    try {
        const promise = Q.all([
            db.queryAsync(query.getProviderByEmail, [ email ]),
            db.queryAsync(query.getProviderByPhone, [ phone ])
        ]);
        const provider = await promise;
        const emailLength = provider[0].length;
        const phoneLength = provider[1].length;
        if (emailLength > 0 || phoneLength > 0) {
            defer.reject({
                code: 409,
                msg: 'A provider with that email/phone number exists already'
            });
        } else {
            defer.resolve(true);
        }
    } catch (e) {
        logger.error('Verify-Provider-Email-Error', e);
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


const saveProvider = async(body) => {
    const defer = Q.defer();
    try {
        const {
            full_name,
            email,
            phone_number,
            city_location,
            service
        } = body;
        const provider_id = uuidv1();
        const promise = Q.all([
            db.queryAsync(
                query.createProvider,
                [
                    provider_id,
                    full_name,
                    phone_number,
                    email,
                    city_location,
                    moment().format('YYYY-MM-DD'),
                    moment().format('YYYY-MM-DD')
                ]
            ),
            db.queryAsync(
                query.createProviderService,
                [
                    uuidv1(),
                    provider_id,
                    service,
                    moment().format('YYYY-MM-DD'),
                    moment().format('YYYY-MM-DD')
                ]
            )
        ]);
        await promise;
        defer.resolve(true);
    } catch (e) {
        logger.error('Add-Provider-Error', e);
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


async function createProvider(req, res) {
    try {
        const { body } = req;
        const { email, phone_number, service } = body;
        await checkRequest(body);
        await verifyService(service);
        await verifyProvider(email, phone_number);
        await saveProvider(body);
        res.status(201).json({
            message: 'Provider created'
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


module.exports = createProvider;
