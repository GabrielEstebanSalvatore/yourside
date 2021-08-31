const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

let tipoArticuloSchema = new Schema({
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

tipoArticuloSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

module.exports = mongoose.model('TipoArticulo', tipoArticuloSchema)
