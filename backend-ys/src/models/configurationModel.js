const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

let configurationModel = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    adminCode: {
        type: String,
        required: true,
    },
    demo: {
        type: Number,
        required: true,
    },
    lastSellName: {
        type: Number,
        required: true,
    },
    useDecimal: {
        type: Number,
    },
    address: {
        type: String,
        required: true,
    },
    cellPhone: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Configuration', configurationModel)
