const mongoose = require('mongoose')
const Schema = mongoose.Schema

let checkoutSchema = new Schema({
    available: {
        type: Number,
        default: 1,
    },
    number: {
        type: Number,
        required: true,
    },
    openCheckoutDate: {
        type: Date,
        default: Date.now,
    },
    closeCheckoutDate: {
        type: Date,
        default: null,
    },
    totalSales: {
        type: Number,
        default: 0,
    },
    receipts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comprabante',
            default: [],
        },
    ],
    receiptsAmount: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('CashRegister', checkoutSchema)
