'use strict';

require('./app/models/db');

const dotenv = require('dotenv');

const fs = require('fs');

const result = dotenv.config();

const Hapi = require('hapi');

const utils = require('./app/api/utils.js');

if (result.error) {
    console.log(result.error.message);
    process.exit(1);
}

const server = Hapi.server({
    port: process.env.PORT || 3000,
    routes: { cors: true },
    tls: {
        key: fs.readFileSync('private_server/webserver.key'),
        cert: fs.readFileSync('private_server/webserver.crt')
    }
});

async function init() {
    await server.register(require('inert'));
    await server.register(require('vision'));
    await server.register(require('hapi-auth-cookie'));
    await server.register(require('bell'));
    //await server.register(require('hapi-auth-jwt2'));

    server.views({
        engines: {
            hbs: require('handlebars'),
        },
        relativeTo: __dirname,
        path: './app/views',
        layoutPath: './app/views/layouts',
        partialsPath: './app/views/partials',
        layout: true,
        isCached: false,
    });

    /*
    server.auth.strategy('jwt', 'jwt', {
        key: 'secretpasswordnotrevealedtoanyone',
        validate: utils.validate,
        verifyOptions: { algorithms: ['HS256'] },
    });
    */
    const authCookieOptions = {
        password: process.env.cookie_password,
        cookie: process.env.cookie_name,
        isSecure: false,
        ttl: 24 * 60 * 60 * 1000,
        redirectTo: '/'
    };

    server.auth.strategy('standard', 'cookie',  authCookieOptions);

    const bellAuthOptions = {
        provider: 'github',
        password: 'github-encryption-password-secure',
        // used during authorisation steps only
        clientId: process.env.git_client_id,
        clientSecret: process.env.git_secret,
        isSecure: true
    };

    server.auth.strategy('github-oauth', 'bell', bellAuthOptions);

    server.auth.default({
        mode: 'required',
        strategy: 'standard',
    });

    server.route(require('./routes'));
    server.route(require('./routesapi'));

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

init();