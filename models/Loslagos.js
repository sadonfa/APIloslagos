const { Schema, model } = require("mongoose");

const LoslagosSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    status_civil: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    anfitrion: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },

});

module.exports = model("clientes", LoslagosSchema)