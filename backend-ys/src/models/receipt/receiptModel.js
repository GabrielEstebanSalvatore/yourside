const mongoose = require('mongoose')
const Schema = mongoose.Schema

let receiptSchema = new Schema({
    available: {
        type: Number,
        default: 1,
    },
    number: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    state: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        default: 0,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    },
    receiptDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReceiptDetail',
    },
})

module.exports = mongoose.model('Receipt', receiptSchema)
