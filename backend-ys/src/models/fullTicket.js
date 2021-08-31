const mongoose = require('mongoose')
const Schema = mongoose.Schema

let fullTicket = new Schema({
    last: { type: Number },
    date: {
        type: Date,
        default: Date.now,
    },
    tickets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ticket',
        },
    ],
    last4: [{ type: Number, type: Number }],
})

module.exports = mongoose.model('fullTicket', fullTicket)
