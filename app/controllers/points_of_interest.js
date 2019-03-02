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

    // ---------------------------------Results of POI's by category ------------------------------------
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


   /*
   Create a new poi
   Provide vaildation to ensure user enters the required fields and users the right input
    */
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

        //Create the ne poi object and save the date to the poi datebase
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

                console.log('POI added with' + newPOI)

                await newPOI.save();

                return h.redirect('/results');


            } catch (err) {
                return h.view('main', {errors: [{message: err.message}]});
            }
        }
    },

    /*
    FUnction to display poi settings (edit poit)
     */
    showPoiSettings: {

            handler: async function(request, h) {

                try{
                    const id = request.params.id;
                    const poi = await POI_db.findById(id);
                    //Log the id to ensure the right poi is being called
                    console.log(id);

                    return h.view('editPOI', { title: 'Edit POI', poi: poi});


                }catch (err){
                    return h.view('editPOI', { errors: [{ message: err.message }] });
                }


        }

    },

    /*
    Update poi function
    Note: I have not completed this entirely properly.
    I had hassle using the correct object id for the document(poi)
    I therefore decided to call the object id through the front end
    Call it through this function which allowed me to edit the correct poi
     */
    updatePoi: {

        handler: async function(request, h){
            try{
                    console.log(request);
                    const poiEdit = request.payload;
                console.log(poiEdit);
                    const id = request.payload.attractionId;
                console.log('test');
                    const poiId = await POI_db.findById(id);
                    console.log(id);
                console.log('test1');
                    poiId.attractionType = poiEdit.attractionType;
                    poiId.attractionName = poiEdit.attractionName;
                    poiId.description = poiEdit.description;
                    poiId.latitude = poiEdit.latitude;
                    poiId.longitude = poiEdit.longitude;
                console.log('test3');
                    await poiId.save();
                    return h.redirect('results');

            } catch (err){
                return h.view('results', {errors: [{message: err.message}]});
            }
        }


    },

    /*
    Delete point of interest function
    Calling the method deleteById from poi.js
     */
    deletePoi: {

        handler: async function(request, h){

            await POI_db.deleteById(request.params.id);

            return h.redirect('/results');

        }

    },
};

module.exports = POI;