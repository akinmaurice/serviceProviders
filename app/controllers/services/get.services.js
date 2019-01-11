const Q = require('q');
const query = require('../../queries');
const db = require('../../../config/database');


const queryServices = async() => {
    const defer = Q.defer();
    try {
        const services = await db.queryAsync(query.getAllServices);
        defer.resolve(services);
    } catch (e) {
        logger.error('Get-Services-Error', e);
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


async function getServices(req, res) {
    try {
        const services = await queryServices();
        res.status(201).json({
            services
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


module.exports = getServices;
