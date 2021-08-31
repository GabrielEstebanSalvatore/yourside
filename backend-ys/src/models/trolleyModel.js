const mongoose = require('mongoose')
const Schema = mongoose.Schema

let trolleySchema = new Schema({
    available: {
        type: Number,
        default: 1,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    total: {
        type: Number,
        default: 0,
    },
    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
        },
    ],
})

module.exports = mongoose.model('Trolley', trolleySchema)
