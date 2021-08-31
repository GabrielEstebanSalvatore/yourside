const mongoose = require('mongoose')
const Schema = mongoose.Schema

let offerSchema = new Schema({
    available: {
        type: Number,
        default: 1,
    },
    name: {
        type: String,
        require: true,
    },
    percent: {
        type: Number,
        default: 1,
    },
    disableDate: {
        type: Date,
    },
})

module.exports = mongoose.model('Offer', offerSchema)
