'use strict';
const index = require('../src/index.js');
const lambdaTestUtils = require('nequi-ci-utils').Lambda8TestUtils;

describe('ach-transfer-bot-send-money/index.js', () => {
    var originalTimeout;

    beforeEach(function () {
        originalTimeout = jasmine.getEnv().defaultTimeoutInterval;
        jasmine.getEnv().defaultTimeoutInterval = 30000;
    });

    afterEach(function () {
        jasmine.getEnv().defaultTimeoutInterval = originalTimeout;
    });

    it('index.js: success', async (done) => {
        try {            
            await lambdaTestUtils.test(index.start, undefined, {});
        } catch (error) {
            console.log('ERROR' + JSON.stringify(error));
            expect(error).not.toBeDefined();
        } finally {
            done();
        }
    });
});