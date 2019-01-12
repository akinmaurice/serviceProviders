const chai = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');

const db = require('../../../config/database');


const createService = rewire('../../../app/controllers/services/create.service.js');
const getServices = rewire('../../../app/controllers/services/get.services.js');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('It validates all unit Functions for Services', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    it('Validation check should fail for request body', async() => {
        const request = {
        };
        const checkRequest = createService.__get__('checkRequest');
        await expect(checkRequest(request)).to.be.rejected;
    });

    it('Should not find an existing service', async() => {
        const service_title = 'verify-j3h3hhj3hb';
        const service = [];
        sandbox.stub(db, 'queryAsync').returns(Promise.resolve(service));
        const verifyService = createService.__get__('verifyService');
        await expect(verifyService(service_title)).to.be.rejected;
    });

    it('Should find an existing service', async() => {
        const service_title = 'verify-j3h3hhj3hb';
        const service = [];
        sandbox.stub(db, 'queryAsync').returns(Promise.resolve(service));
        const verifyService = createService.__get__('verifyService');
        const response = await verifyService(service_title);
        response.should.equal(true);
    });

    it('Should find create a new service', async() => {
        const service = {
            service_title: 'verify-j3h3hhj3hb',
            description: 'nvghhgvhvg'
        };
        sandbox.stub(db, 'queryAsync').returns(Promise.resolve(service));
        const saveService = createService.__get__('saveService');
        const response = await saveService(service);
        response.should.equal(true);
    });

    it('Should get all services', async() => {
        const services = [];
        sandbox.stub(db, 'queryAsync').returns(Promise.resolve(services));
        const queryServices = getServices.__get__('queryServices');
        const response = await queryServices();
        response.should.equal(services);
    });
});
