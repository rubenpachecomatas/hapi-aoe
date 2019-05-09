const Wreck = require('wreck');
const CivModel = require('./models/civmodel');
const functions = require('./functions');

// Routes

module.exports = [

    {
        method: "GET",
        path: "/",
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async (request, h) => {
            return functions.getall(request, h);
        }
    },

    {
        method: "GET",
        path: "/getciv/{id}",
        handler: async (request, h) => {
            try {
                return functions.getCivById(request, h);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },

    {
        method: "DELETE",
        path: "/deleteciv/{id}",
        handler: async (request, h) => {
            try {
                return functions.deleleCivById(request, h);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },

    {
        method: "POST",
        path: "/deleteciv",
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async (request, h) => {
            try {
                return functions.deleleCiv(request, h);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },

    {
        method: "PUT",
        path: "/updateciv/{id}",
        handler: async (request, h) => {
            try {
                return functions.updateCivbyId(request, h);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },

    {
        method: "POST",
        path: "/updateciv",
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async (request, h) => {
            try {
                return functions.updateCiv(request, h);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },

    {
        method: "POST",
        path: "/createciv",
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async (request, h) => {
            try {
                return functions.createCiv(request, h);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    },

    {
        method: "GET",
        path: "/civs",
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
        handler: async (request, h) => {
            return functions.getAllS(request, h);
        }
    }
];