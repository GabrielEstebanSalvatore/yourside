const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido',
}
let clienteSchema = new Schema({
    available: {
        type: Number,
        default: 1,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cell: {
        type: String,
        required: true,
    },
    state: {
        type: Number,
        default: 1,
        required: true,
    },
    trolley: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trolley',
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos,
    },
})

/*ELIMINA LA CONTRASEÑA*/
clienteSchema.methods.toJSON = function () {
    let user = this
    let userObject = user.toObject()
    delete userObject.password

    return userObject
}
clienteSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' })

module.exports = mongoose.model('Cliente', clienteSchema)
