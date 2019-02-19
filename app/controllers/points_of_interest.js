'use strict';

//Include the datebase model
const POI_db = require('../models/poi');

//Include the user modl
const User = require('../models/user');

const Joi = require('joi');

const POI = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Add a Discovery' });
        }
    },
    //results to display all points of interest
    results: {
        handler: async function (request, h) {
            const pois = await POI_db.find().populate('poi');
            return h.view('results', {
                title: 'List of POIs',
                pois: pois
            });
        }
    },

    resultsBeach: {
        handler: async function (request, h) {
            const pois = await POI_db.find({attractionType:"beach"}).populate('poi');
            return h.view('resultsBeach', {
                title: 'List of Beaches',
                pois: pois
            });
        }
    },

    resultsHistoric: {
        handler: async function (request, h) {
            const pois = await POI_db.find({attractionType:"historic"}).populate('poi');
            return h.view('resultsHistoric', {
                title: 'List of Historic POIs',
                pois: pois
            });
        }
    },

    resultsOutdoor: {
        handler: async function (request, h) {
            const pois = await POI_db.find({attractionType: { $in:["woodlands", "mountains"]}}).populate('poi');
            return h.view('outdoorActivities', {
                title: 'List of Outdoor Activities',
                pois: pois
            });
        }
    },

    resultsFoodDrink: {
        handler: async function (request, h) {
            const pois = await POI_db.find({attractionType:"food and drink"}).populate('poi');
            return h.view('foodAndDrink', {
                title: 'List of Food & Drink',
                pois: pois
            });
        }
    },

    //points of interest
    poi: {

        validate: {
            payload: {
                attractionType: Joi.string().required(),
                attractionName: Joi.string().required(),
                description: Joi.string(),
                latitude: Joi.number(),
                longitude: Joi.number()

            },
            options: {
                abortEarly: false
            },
            failAction: function(request, h, error) {
                return h
                    .view('partials/poi', {
                        title: 'POI entry error',
                        errors: error.details
                    })
                    .takeover()
                    .code(400);
            }
        },
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const data = request.payload;
                const newPOI = new POI_db({
                    attractionType: data.attractionType,
                    attractionName: data.attractionName,
                    description: data.description,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    poi: user._id
                });
                await newPOI.save();
                return h.redirect('/results');
            } catch (err) {
                return h.view('main', {errors: [{message: err.message}]});
            }
        }
    }
};

module.exports = POI