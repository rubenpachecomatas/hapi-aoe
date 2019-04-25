const Hapi = require('hapi');
const Joi = require('joi');
const Mongoose = require('mongoose');
const fetch = require('node-fetch');

// Server.

const server = new Hapi.Server({
    host: 'localhost',
    port: 3030
});

Mongoose.connect("mongodb://localhost/civilizations");

const CivModel = Mongoose.model("civilization", {
    name: String,
    expansion: String,
    army: String
});

fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations')
    .then(res => res.json())
    .then(json => {
        const civs = new CivModel({name: json.name, expansion: json.expansion, army: json.army_type});
        console.log(civs);
    });