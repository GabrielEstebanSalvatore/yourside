const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const articleTypeSchema = new Schema({
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

articleTypeSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' })

module.exports = mongoose.model('ArticleType', articleTypeSchema)
