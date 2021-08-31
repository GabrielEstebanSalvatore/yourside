const Cliente = require('../models/clienteModel')
const Trolley = require('../models/trolleyModel')
const _ = require('underscore')
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')

class clienteController {
    static async create(req, res) {
        const errores = validationResult(req)
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() })
        }
        const { email, password } = req.body

        try {
            // Revisar que el usuario registrado sea unico
            let cliente = await Cliente.findOne({ email })

            if (cliente) {
                return res.status(400).json({ msg: 'El cliente ya existe' })
            }

            // crea el nuevo carrito
            let clienteTrolley = new Trolley()
            await clienteTrolley.save()
            console.log(clienteTrolley)

            // crea el nuevo usuario
            cliente = new Cliente(req.body)
            cliente.trolley = clienteTrolley._id
            // Hashear el password
            const salt = await bcryptjs.genSalt(10)
            cliente.password = await bcryptjs.hash(password, salt)

            // guardar usuario
            await cliente.save()
            return res.json(cliente)
        } catch (error) {
            console.log(error)
            res.status(400).send('Hubo un error')
        }
    }

    static async updateTrolley(req, res) {
        console.log(req.body)
        let client = req.body.client
        let trolleyC = { articles: req.body.trolleyClient }

        await Trolley.findByIdAndUpdate(
            client._id,
            trolleyC,
            (err, trolleyDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err,
                    })
                } else {
                    res.status(200).json({
                        ok: true,
                        cliente: trolleyDB,
                    })
                }
            }
        )
    }

    static async getAll(req, res) {
        await Cliente.find().exec((err, cliente) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                })
            }
            Cliente.countDocuments((err, conteo) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err,
                    })
                }
                res.json({
                    ok: true,
                    cliente,
                    cuantos: conteo,
                })
            })
        })
    }

    static async getOne(req, res) {
        let id = req.params.id

        Cliente.findById(id).exec((err, clienteDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                })
            }
            if (!clienteDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es correcto',
                    },
                })
            }
            res.json({
                ok: true,
                cliente: clienteDB,
            })
        })
    }

    static async updateCliente(req, res) {
        let id = req.params.id
        let body = _.pick(req.body, [
            'name',
            'address',
            'email',
            'cell',
            'state',
            'role',
        ])

        await Cliente.findByIdAndUpdate(id, body, (err, clienteDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                })
            } else {
                res.status(200).json({
                    ok: true,
                    cliente: {
                        message: `El cliente ${clienteDB.name} fue actualizado`,
                    },
                })
            }
        })
    }

    static async deleted(req, res) {
        const id = req.params.id
        let cliente = await Cliente.findById(id)
        let body = { available: !cliente.available }

        await Cliente.findByIdAndUpdate(id, body, (err, clienteDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                })
            } else {
                res.status(200).json({
                    ok: true,
                    cliente: {
                        message: `El cliente ${clienteDB.name} fue modificado`,
                    },
                })
            }
        })
    }
}

module.exports = clienteController
