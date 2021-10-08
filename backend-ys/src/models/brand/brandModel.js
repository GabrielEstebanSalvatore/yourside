const mongoose = require('mongoose')
const Schema = mongoose.Schema

let brandSchema = new Schema({
    available: {
        type: Number,
        default: 1,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
})

module.exports = mongoose.model('Brand', brandSchema)
