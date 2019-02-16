'use strict';

//Include the datebase model
const POI_db = require('../models/poi');

//Include the user modl
const User = require('../models/user');

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
    //points of interest
    poi: {
        handler: async function(request, h) {
            const id = request.auth.credentials.id;
            const user = await User.findById(id);
            const data = request.payload;
            const newPOI = new POI_db({
                attractionType: data.attractionType,
                attractionName: data.attractionName,
                comment: data.comment,
                latitude: data.latitude,
                longitude: data.longitude,
                //firstName: user.firstName,
                //lastName: user.lastName
                poi: user._id
            });
            await newPOI.save();
            return h.redirect('/results');
        }
    }
};

module.exports = POI