const POIS = require('./app/api/pois');
const Users= require('./app/api/users');
const Admissions = require('./app/api/admissions');

module.exports = [
    { method: 'GET', path: '/api/pois', config: POIS.find },
    { method: 'GET', path: '/api/pois/{id}', config: POIS.findOne },

    { method: 'POST', path: '/api/pois', config: POIS.create },
    { method: 'DELETE', path: '/api/pois/{id}', config: POIS.deleteOne },
    { method: 'DELETE', path: '/api/pois', config: POIS.deleteAll },

    { method: 'GET', path: '/api/users', config: Users.find },
    { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
    { method: 'POST', path: '/api/users', config: Users.create },
    { method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
    { method: 'DELETE', path: '/api/users', config: Users.deleteAll },

    { method: 'GET', path: '/api/admissions', config: Admissions.findAll }
];