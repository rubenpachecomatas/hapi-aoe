const Wreck = require('wreck');
const Mongoose = require('mongoose');

// Model

const CivModel = Mongoose.model("civilization", {
    id: Number,
    name: String,
    expansion: String,
    army: String
});

// Routes

module.exports = [
    {
        method: "GET",
        path: "/",
        handler: async (request, h) => {
            const { res, payload } = await Wreck.get('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations');
            const c = JSON.parse(payload).civilizations
            for (let i = 0; i < c.length; i++) {
                await CivModel.findOne({ id: c[i].id }, (err, user) => {
                    if (err) {
                        console.log(err)
                    } else {
                        if (!user) {
                            const civs = new CivModel({
                                id: c[i].id,
                                name: c[i].name,
                                expansion: c[i].expansion,
                                army: c[i].army_type,
                            });
                            civs.save().then(() => console.log('Saved'));
                        } else {
                            // UPDATE
                            console.log(user)
                        }
                    }
                });
            }
            var civis = await CivModel.find().exec();
            return h.response(civis);
        }
    },

    {
        method: "DELETE",
        path: "/deleteciv/{id}",
        handler: async (request, h) => {
            try {
                var result = await CivModel.findByIdAndDelete(request.params.id);
                return h.response(result);
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
                var result = await CivModel.findByIdAndUpdate(request.params.id, request.payload, { new: true });
                return h.response(result);
            } catch (error) {
                return h.response(error).code(500);
            }
        }
    }
];