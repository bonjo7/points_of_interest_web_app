'use strict';

const assert = require('chai').assert;
const axios = require('axios');

suite('Point of Interest API tests', function () {

    test('get pois', async function () {

        const response = await axios.get('http://localhost:3000/api/pois');
        const pois = response.data;
        assert.equal(6, pois.length);

        assert.equal(pois[0].attractionType, 'Mountains');
        assert.equal(pois[0].attractionName, 'Coumshingaun');

        assert.equal(pois[1].attractionType, 'Mountains');
        assert.equal(pois[1].attractionName, 'Mahon Falls');

        assert.equal(pois[2].attractionType, 'Historic');
        assert.equal(pois[2].attractionName, 'Reginald Tower');

        assert.equal(pois[3].attractionType, 'Outdoor');
        assert.equal(pois[3].attractionName, 'Greenway - Bilberry');

        assert.equal(pois[4].attractionType, 'Beach');
        assert.equal(pois[4].attractionName, 'Tramore Strand');

        assert.equal(pois[5].attractionType, 'Historic');
        assert.equal(pois[5].attractionName, 'Lismore Castle');

    });

    test('get one point of interest', async function () {
        let response = await axios.get('http://localhost:3000/api/pois');
        const pois = response.data;
        assert.equal(6, pois.length);

        const onePOIUrl = 'http://localhost:3000/api/pois/' + pois[2]._id;
        response = await axios.get(onePOIUrl);
        const onePOI = response.data;

        assert.equal(onePOI.attractionType, 'Historic');
        assert.equal(onePOI.attractionName, 'Reginald Tower');
    });

    test('create a point of interest', async function () {
        const poisUrl = 'http://localhost:3000/api/pois';
        const newPOI = {
            attractionType: 'Outdoor',
            attractionName: 'Greenway - Durrow',
            description: 'The Waterford Greenway is a spectacular 46km off-road cycling and walking trail along an old railway line between Waterford and Dungarvan.\nEnjoy a beautiful journey across three tall viaducts from the river to the sea.',
            latitude: '52.1228648',
            longitude: '-7.5059336'
        };

        const response = await axios.post(poisUrl, newPOI);
        const returnedPoi = response.data;
        assert.equal(201, response.status);

        assert.equal(returnedPoi.attractionType, 'Outdoor');
        assert.equal(returnedPoi.attractionName, 'Greenway - Durrow');
        assert.equal(returnedPoi.description, 'The Waterford Greenway is a spectacular 46km off-road cycling and walking trail along an old railway line between Waterford and Dungarvan.\nEnjoy a beautiful journey across three tall viaducts from the river to the sea.');
        assert.equal(returnedPoi.latitude, '52.1228648');
        assert.equal(returnedPoi.longitude, '-7.5059336');
    });
});