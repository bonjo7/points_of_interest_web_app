'use strict';

const POI = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Add a Discovery' });
        }
    },
    results: {
        handler: function(request, h) {
            return h.view('results', { title: 'Discover Waterford',
                pois: this.pois});
        }
    },
    poi: {
        handler: function (request, h) {
            const data = request.payload;
            var donorEmail = request.auth.credentials.id;
            data.donor = this.users[donorEmail];
            this.pois.push(data);
            return h.redirect('/results');
        }
    }
};

module.exports = POI