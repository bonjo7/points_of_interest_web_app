'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const admissionSchema = Schema({
    admissionFee: String,
});

module.exports = Mongoose.model('Admission', admissionSchema);