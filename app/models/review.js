'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const reviewSchema = new Schema({
    rating: String,
    review: String,
    //poi: {
        //type: Schema.Types.ObjectId,
        //ref: 'POI'
    //},
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = Mongoose.model('Reviews', reviewSchema);