'use strict';

const Review = require('../models/review');

const User = require('../models/user');

const POI = require('../models/poi');

const Reviews = {
    review: {
        handler: async function(request, h) {
            try {
                const id = request.auth.credentials.id;
                const poiId = request.params.id;
                const poi = await POI.findById(poiId);
                const user = await User.findById(id);
                console.log(poi);
                const data = request.payload;
                const newReview = new Review({
                    rating: data.rating,
                    review: data.review,
                    reviewer: user._id
                });
                await newReview.save();
                console.log(newReview);
                return h.redirect('/results');
            } catch (err) {
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    },

    reviewreport: {
        handler: async function(request, h) {
            const reviews = await Review.find().populate('reviewer')
            return h.view('reviewreport', {
                title: 'Donations to Date',
                reviews: reviews
            });
        }
    }

};

module.exports = Reviews;
