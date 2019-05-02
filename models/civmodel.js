const Mongoose = require('mongoose');

const CivModel = Mongoose.model("civilization", {
    id: Number,
    name: String,
    expansion: String,
    army: String
});

module.exports = CivModel;