const POIS = require('./app/api/pois');

module.exports = [
    { method: 'GET', path: '/api/pois', config: POIS.find },
    { method: 'GET', path: '/api/pois/{id}', config: POIS.findOne },

    { method: 'POST', path: '/api/pois', config: POIS.create },
    { method: 'DELETE', path: '/api/pois/{id}', config: POIS.deleteOne },
    { method: 'DELETE', path: '/api/pois', config: POIS.deleteAll },
];