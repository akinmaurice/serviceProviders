import config from './';

const pgp = require('pg-promise');
const promise = require('bluebird');

const pg = pgp({ promiseLib: promise, noLocking: true });
const Db = pg(config.STUDENT_DATABASE_URL);

export default Db;
