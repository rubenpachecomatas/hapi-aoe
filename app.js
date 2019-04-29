const Hapi = require('hapi');
const Joi = require('joi');
const Mongoose = require('mongoose');
const fetch = require('node-fetch');
const Wreck = require('wreck');

// Server.

const server = new Hapi.Server({
    host: 'localhost',
    port: 3030
});

Mongoose.connect("mongodb://localhost/civilizations");

const CivModel = Mongoose.model("civilization", {
    id: Number,
    name: String,
    expansion: String,
    army: String
});

server.route({
    method: "GET",
    path: "/",
    handler: async (request, h) => {
        const { res, payload } = await Wreck.get('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations');
        const c = JSON.parse(payload).civilizations
        for (let i = 0; i < c.length; i++) {
            var civs = new CivModel({
                id: c[i].id,
                name: c[i].name,
                expansion: c[i].expansion,
                army: c[i].army_type,
            });
            await CivModel.findOne({id: civs.id}, (data) => {
                console.log(data)
            });
            console.log(CivModel.findOne({id: civs.id, _id:0}));
            console.log(civs.id);
            console.log(c[i].id);
            if (!(await CivModel.findOne({},{id: civs.id, _id:0}).exec())) {
                civs.save().then(() => console.log('Saved'));
            }
        }
        var civis = await CivModel.find().exec();
        return h.response(civis);
    }
});

server.start();