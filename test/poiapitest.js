'use strict';

const assert = require('chai').assert;
const POIService = require('./poi-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('POI API tests', function () {

    let pois = fixtures.points_of_interest;
    let newPoi = fixtures.newPOI;

    const poiService = new POIService('http://localhost:3000');

    setup(async function () {
        await poiService.deleteAllPOIs();
    });

    teardown(async function () {
        await poiService.deleteAllPOIs();
    });


    test('create a point of interest', async function () {
        const returnedPOI = await poiService.createPOI(newPoi);
        /*
        Unable to get the more efficient code working, throws error
        assert(_.some([returnedPOI], newPoi),  'returned POI must be a superset of new POI');
        */
        assert.equal(returnedPOI.attractionType, newPoi.attractionType);
        assert.equal(returnedPOI.attractionName, newPoi.attractionName);
        assert.equal(returnedPOI.description, newPoi.description);
        assert.equal(returnedPOI.latitude, newPoi.latitude);
        assert.equal(returnedPOI.longitude, newPoi.longitude);

        assert.isDefined(returnedPOI._id);

    });

    test('get point of interest', async function () {
        const poi1 = await poiService.createPOI(newPoi);
        const poi2 = await poiService.getPOI(poi1._id);
        assert.deepEqual(poi1, poi2);
    });

    test('get invalid point of interest', async function () {
        const poi1 = await poiService.getPOI('1234');
        assert.isNull(poi1);
        const poi2 = await poiService.getPOI('012345678901234567890123');
        assert.isNull(poi2);
    });


    test('delete a point of interest', async function () {
        let p = await poiService.createPOI(newPoi);
        assert(p._id != null);
        await poiService.deleteOnePOI(p._id);
        p = await poiService.getPOI(p._id);
        assert(p == null);
    });

    test('get all points of interest', async function () {
        for (let p of pois) {
            await poiService.createPOI(p);
        }

        const allPOIs = await poiService.getPOIs();
        assert.equal(allPOIs.length, pois.length);
    });

    test('get points of interest detail', async function () {
        for (let p of pois) {
            await poiService.createPOI(p);
        }

        const allPOIs = await poiService.getPOIs();
        for (var i = 0; i < pois.length; i++) {
            assert(_.some([allPOIs[i]], pois[i]), 'returned POI must be a superset of new POI');
        }
    });

    test('get all points of interest empty', async function () {
        const allPOIs = await poiService.getPOIs();
        assert.equal(allPOIs.length, 0);
    });
});