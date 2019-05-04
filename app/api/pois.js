'use strict';

const Boom = require('boom');

const POI = require('../models/poi');

const POIS = {

    find: {
        auth: false,
        handler: async function (request, h) {
            const pois = await POI.find();
            return pois;
        }
    },

    findOne: {
        auth: false,
        handler: async function (request, h) {
            try {
                const poi = await POI.findOne({_id: request.params.id});
                if (!poi) {
                    return Boom.notFound('No Point of Interest found with this id');
                }
                return poi;
            } catch (err) {
                return Boom.notFound('No Point of interest with this id');
            }
        }
    },

    create: {
        auth: false,
        handler: async function (request, h) {
            const newPOI = new POI(request.payload);
            const poi = await newPOI.save();
            if (poi) {
                return h.response(poi).code(201);
            }
            return Boom.badImplementation('error creating Point of Interest');
        }
    },

    deleteAll: {
        auth: false,
        handler: async function (request, h) {
            await POI.remove({});
            return {success: true};
        }
    },

    deleteOne: {
        auth: false,
        handler: async function (request, h) {
            const poi = await POI.remove({_id: request.params.id});
            if (poi.deletedCount == 1) {
                return {success: true};
            }
            return Boom.notFound('id not found for selected point of interest');
        }
    }
}

module.exports = POIS;