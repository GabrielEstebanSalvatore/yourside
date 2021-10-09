const mongoose = require('mongoose')
const Schema = mongoose.Schema

let articleSchema = new Schema({
    available: {
        type: Number,
        default: 1,
    },
    description: {
        type: String,
        defaul: '',
    },
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: false,
    },
    costPrice: {
        type: Number,
        required: true,
    },
    sellPrice: {
        type: Number,
        required: true,
    },
    sellPriceOffer: {
        type: Number,
    },
    negativeStock: {
        type: Number,
        required: true,
    },
    minimum: {
        type: Number,
        required: true,
        defaul: 1,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
    articleType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArticleType',
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
    },
    offer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer',
    },
})

module.exports = mongoose.model('Article', articleSchema)
