'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
    attractionType: String,
    attractionName: String,
    description: String,
    latitude: Number,
    longitude: Number,
    poi: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = Mongoose.model('Points_of_Interest', poiSchema);