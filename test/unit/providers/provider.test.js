const chai = require('chai');
const sinon = require('sinon');
const rewire = require('rewire');

const db = require('../../../config/database');


const createProvider = rewire('../../../app/controllers/providers/create.provider.js');
const getProvidersLocation = rewire('../../../app/controllers/providers/get.providers.location.js');
const getProviders = rewire('../../../app/controllers/providers/get.providers.services.js');

const should = chai.should();
const { expect } = chai;
let sandbox;


describe('It validates all Functions to create a provider', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });
    it('Validation check should fail for request body', async() => {
        const request = {
        };
        const checkRequest = createProvider.__get__('checkRequest');
        await expect(checkRequest(request)).to.be.rejected;
    });

    it('Should not find an existing service', async() => {
        const service_title = 'verify-j3h3hhj3hb';
        const service = [];
        sandbox.stub(db, 'queryAsync').returns(Promise.resolve(service));
        const verifyService = createProvider.__get__('verifyService');
        await expect(verifyService(service_title)).to.be.rejected;
    });

    it('Should find an existing service', async() => {
        const service_title = 'verify-j3h3hhj3hb';
        const service = {
            service_title: 'user-12345'
        };
        sandbox.stub(db, 'queryAsync').returns(Promise.resolve(service));
        const verifyService = createProvider.__get__('verifyService');
        const response = await verifyService(service_title);
        response.should.equal(true);
    });

    it('Should find an existing provider', async() => {
        const email = 'akin@gmail.com';
        const phone = '08166598325';
        const provider = [
            [ 'user-12345' ],
            [ 'hjhgvghgv' ]
        ];
        sandbox.stub(db, 'queryAsync').returns(Promise.resolve(provider));
        const verifyProvider = createProvider.__get__('verifyProvider');
        await expect(verifyProvider(email, phone)).to.be.rejected;
    });

    it('Should not find an existing provider', async() => {
        const email = 'akin@gmail.com';
        const phone = '08166598325';
        const provider = [];
        sandbox.stub(db, 'queryAsync').returns(Promise.resolve(provider));
        const verifyProvider = createProvider.__get__('verifyProvider');
        const response = await verifyProvider(email, phone);
        response.should.equal(true);
    });

    it('Should create a new provider', async() => {
        const body = {
            email: 'akin@gmail.com',
            full_name: 'Akinyemi',
            phone_number: '08165655656',
            city_location: 'Lagos',
            service: '77878987897'
        };
        const provider = [];
        sandbox.stub(db, 'queryAsync').returns(Promise.resolve(provider));
        const saveProvider = createProvider.__get__('saveProvider');
        const response = await saveProvider(body);
        response.should.equal(true);
    });

    it('Should get providers by location', async() => {
        const location = 'Lagos';
        const providers = [
            'user-12345',
            'jfjfjf'
        ];
        sandbox.stub(db, 'queryAsync').returns(Promise.resolve(providers));
        const queryProviders = getProvidersLocation.__get__('queryProviders');
        const response = await queryProviders(location);
        response.should.equal(providers);
    });

    it('Should get providers by services', async() => {
        const location = 'Lagos';
        const providers = [
            'user-12345',
            'jfjfjf'
        ];
        sandbox.stub(db, 'queryAsync').returns(Promise.resolve(providers));
        const queryProviders = getProviders.__get__('queryProviders');
        const response = await queryProviders(location);
        response.should.equal(providers);
    });
});
