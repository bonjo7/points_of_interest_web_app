'use strict';

const Accounts = require('./app/controllers/accounts');
const POI = require('./app/controllers/points_of_interest');

module.exports = [

    //User account settings
    { method: 'GET', path: '/', config: Accounts.index },
    { method: 'GET', path: '/signup', config: Accounts.showSignup },
    { method: 'GET', path: '/login', config: Accounts.showLogin },
    { method: 'GET', path: '/logout', config: Accounts.logout },
    { method: 'POST', path: '/signup', config: Accounts.signup },
    { method: 'POST', path: '/login', config: Accounts.login },
    { method: 'GET', path: '/settings', config: Accounts.showSettings },
    { method: 'POST', path: '/settings', config: Accounts.updateSettings },
    { method: 'GET', path: '/settings/deleteUser', config: Accounts.deleteUser },

    //Points of interest settings
    { method: 'GET', path: '/home', config: POI.home },
    { method: 'GET', path: '/results', config: POI.results },
    { method: 'GET', path: '/resultsBeach', config: POI.resultsBeach },
    { method: 'GET', path: '/resultsHistoric', config: POI.resultsHistoric },
    { method: 'GET', path: '/outdoorActivities', config: POI.resultsOutdoor },
    { method: 'GET', path: '/foodAndDrink', config: POI.resultsFoodDrink },

    { method: 'POST', path: '/poi', config: POI.poi },

    { method: 'GET', path: '/poi/deletePoi{id}', config: POI.deletePoi },

    { method: 'GET', path: '/poi/showPoiSettings{id}', config: POI.showPoiSettings },
    { method: 'POST', path: '/settingsPoi{id}', config: POI.updatePoi },
    { method: 'GET', path: '/poi/viewPoi{id}', config: POI.viewPoi},



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
