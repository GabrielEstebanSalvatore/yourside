const mongoose = require('mongoose')
const Schema = mongoose.Schema

const receiptDetailSchema = new Schema({
    available: {
        type: Number,
        default: 1,
    },
    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
        },
    ],
    amount: {
        type: Number,
        default: 1,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    state: {
        type: Number,
        default: 1,
    },
})

module.exports = mongoose.model('ReceiptDetail', receiptDetailSchema)
