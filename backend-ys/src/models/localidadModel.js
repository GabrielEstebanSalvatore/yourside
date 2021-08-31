const mongoose = require('mongoose')
const Schema = mongoose.Schema

let localidadSchema = new Schema({
    available: {
        type: Number,
        default: true,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
})

module.exports = mongoose.model('Localidad', localidadSchema)
