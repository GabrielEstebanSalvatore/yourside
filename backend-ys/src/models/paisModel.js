const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


let paisSchema = new Schema({
name:{
    type: String,
    unique:true,
    required: true
}});


paisSchema.plugin(uniqueValidator, {message:'{PATH} debe ser único'})

module.exports = mongoose.model('Pais', paisSchema);