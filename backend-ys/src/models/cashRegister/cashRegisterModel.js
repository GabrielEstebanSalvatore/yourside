const mongoose = require('mongoose')
const Schema = mongoose.Schema

let cashRegisterSchema = new Schema({
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
            ref: 'Receipt',
            default: [],
        },
    ],
    receiptsAmount: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('CashRegister', cashRegisterSchema)
