const Mongoose = require('mongoose');

const CivModel = Mongoose.model("civilization", {
    name: String,
    expansion: String,
    army: String
});

module.exports = CivModel;