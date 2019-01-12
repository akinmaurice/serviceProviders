const Q = require('q');
const query = require('../../queries');
const db = require('../../../config/database');


const queryProviders = async(location) => {
    const defer = Q.defer();
    try {
        const providers = await db.queryAsync(query.getProvidersByLocation, [ location ]);
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


async function getProvidersLocation(req, res) {
    try {
        const { params: { location } } = req;
        const providers = await queryProviders(location);
        res.status(200).json({
            providers
        });
    } catch (e) {
        res.status(e.code).json({
            error: e.msg
        });
    }
}


module.exports = getProvidersLocation;
