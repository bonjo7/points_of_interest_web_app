'use strict';

const Accounts = require('./app/controllers/accounts');
const POI = require('./app/controllers/points_of_interest');

module.exports = [
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },
    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings },

    { method: 'GET', path: '/home', config: POI.home },
    { method: 'GET', path: '/results', config: POI.results },
    { method: 'GET', path: '/resultsBeach', config: POI.resultsBeach },
    { method: 'GET', path: '/resultsHistoric', config: POI.resultsHistoric },
    { method: 'GET', path: '/outdoorActivities', config: POI.resultsOutdoor },
    { method: 'GET', path: '/foodAndDrink', config: POI.resultsFoodDrink },

    { method: 'POST', path: '/poi', config: POI.poi },



    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        },
        options: { auth: false }
    }
];
