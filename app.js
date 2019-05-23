const Hapi = require('hapi');
const Mongoose = require('mongoose');
const routes = require('./router')

// Server.

const server = new Hapi.Server({
    host: 'localhost',
    port: process.env.PORT || 3030
});

Mongoose.connect("mongodb://localhost/civilizations", {useNewUrlParser: true});

server.route(routes);

server.start();