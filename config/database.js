const mysql = require('mysql');
const bluebird = require('bluebird');
const config = require('./');


const connection = mysql.createConnection(config.DATABASE_URL);

const db = bluebird.promisifyAll(connection);

db.connectAsync()
    .then(() => {
        logger.info('Database connected');
    })
    .catch((e) => {
        logger.error(`unable to connect to Database: ${e}`);
    });

module.exports = db;
