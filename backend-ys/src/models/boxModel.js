const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let boxSchema = new Schema({
available:{
    type: Number,
    default : 1
},
number:{
    type: Number,
    required: true
},
openBoxDate:{
    type: Date,
    default: Date.now
},
closeBoxDate:{
    type: Date
},
totalSales:{
    type: Number,
    default: 0,
},
comprobantes:[{
    type: mongoose.Schema.Types.ObjectId,    
    ref: 'Comprabante',
    default: [],
}],
comprobantesAmount:{
    type: Number,
    default: 0,
},
});

module.exports = mongoose.model('Box', boxSchema);