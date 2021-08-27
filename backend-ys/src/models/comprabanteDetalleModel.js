const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let comprobanteDetalleSchema = new Schema({
article:[{
    type: mongoose.Schema.Types.ObjectId,    
    ref: 'Articulo'
}],
amount:{
    type: Number,
    default: 1,
    required: true
},
price:{
    type: Number,
    required: true
},
state:{
    type: Number,
    default:1,
}});


module.exports = mongoose.model('ComprabanteDetalle', comprobanteDetalleSchema);