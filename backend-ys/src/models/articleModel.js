const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let articleSchema = new Schema({
available:{
    type: Number,
    default : 1
},
description:{
    type: String,
    defaul: ''
},
code:{
    type: String,
    required: true
},
name:{
    type: String,
    required: true
},
amount:{
    type: Number,
    required: false,
},
costPrice:{
    type: Number,
    required: true
},
sellPrice:{
    type: Number,
    required: true,
},
sellPriceOffer:{
    type: Number
},
negativeStock:{
    type: Number,
    required: true,
},
minimum:{
    type: Number,
    required: true,
    defaul: 1
},
branch:{//
    type: mongoose.Schema.Types.ObjectId,    
    ref: 'Branch'},
articleType:{
    type: mongoose.Schema.Types.ObjectId,    
    ref: 'TipoArticulo'
},
image:{
    type: mongoose.Schema.Types.ObjectId,    
    ref: 'Image',
    defaul: null
},
offer:{//
    type: mongoose.Schema.Types.ObjectId,    
    ref: 'Offer',
    defaul: null
}});

module.exports = mongoose.model('Article', articleSchema);