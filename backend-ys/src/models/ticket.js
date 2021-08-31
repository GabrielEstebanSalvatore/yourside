const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ticket = new Schema({
    number: { type: Number },
    desk: { type: Number },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('ticket', ticket)
