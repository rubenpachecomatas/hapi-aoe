const Wreck = require('wreck');
const CivModel = require('./models/civmodel');

module.exports = {
    getall: async (request, h) => {
        const { res, payload } = await Wreck.get('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations');
        const c = JSON.parse(payload).civilizations
        console.log(CivModel);
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
    },

    getAllS: async(request, h) => {
        var civs = await CivModel.find().exec();
        return h.response(civs);
    },

    createCiv: async(request, h) => {
        var r = request.payload;
        console.log(r);
        const civs = new CivModel({
            id: r.id,
            name: r.name,
            expansion: r.expansion,
            army: r.army,
        });
        console.log(civs);
        civs.save().then(() => console.log('Saved'));

        return { message: 'Added' };
    },

    updateCiv: async(request, h) => {
        console.log(request.payload.data.id, request.payload.civilization);
        var result = await CivModel.findByIdAndUpdate(request.payload.data.id, request.payload.civilization, { new: true });
        console.log(result);
        return { message: 'Updated' };
    },
    
    updateCivbyId: async(request, h) => {
        var result = await CivModel.findByIdAndUpdate(request.params.id, request.payload, { new: true });
        return h.response(result);
    },

    deleleCiv: async(request, h) => {
        console.log(request.payload.id);
        var result = await CivModel.findByIdAndDelete(request.payload.id);
        console.log(result);
        return { message: 'Deleted' };
    },

    deleleCivById: async(request, h) => {
        var result = await CivModel.findByIdAndDelete(request.params.id);
        return h.response(result);
    },

    getCivById: async(request, h) => {
        console.log(request.params.id);
        var result = await CivModel.findById(request.params.id);
        return h.response(result);
    }
}