'use strict';

const Boom = require('boom');
const Admission = require('../models/admission');

const Admissions = {
    findAll: {
        auth: false,
        handler: async function (request, h) {
            const admissions = await Admission.find();
            return admissions;
        }
    }
};

module.exports = Admissions;