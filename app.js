const Hapi = require('hapi');
const Mongoose = require('mongoose');
const routes = require('./router')

// Server.

const server = new Hapi.Server({
    //host: 'localhost',
    port: process.env.PORT || 3030
});

Mongoose.connect("mongodb+srv://odlana:odlana@aoe-db-b434a.mongodb.net/test?retryWrites=true", {useNewUrlParser: true});

server.route(routes);

server.start();