const Q = require('q');
const query = require('../../queries');
const db = require('../../../config/database');


const queryProviders = async(service) => {
    const defer = Q.defer();
    try {
        const providers = await db.queryAsync(query.getProvidersByService, [ service ]);
        defer.resolve(providers);
    } catch (e) {
        logger.error('Get-Providers-Error', e);
        defer.reject({
            code: 500,
            msg: 'Unknown Error'
        });
    }
    return defer.promise;
};


async function getProviders(req, res) {
    try {
        const { params: { service } } = req;
        const providers = await queryProviders(service);
        res.status(200).json({
            providers
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


module.exports = getProviders;
