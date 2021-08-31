const Localidad = require('../models/localidadModel')
const _ = require('underscore')
const { validationResult } = require('express-validator')

class localidadController {
    static async create(req, res) {
        // revisar si hay errores
        const errores = validationResult(req)
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() })
        }

        const { name } = req.body

        try {
            // Revisar que el usuario registrado sea unico
            let localidad = await Localidad.findOne({ name })

            if (localidad) {
                return res.status(400).json({ msg: 'La localidad ya existe' })
            }
            localidad = new Localidad(req.body)
            await localidad.save()
        } catch (error) {
            console.log(error)
            res.status(400).send('Hubo un error')
        }
    }

    static async getAll(req, res) {
        await Localidad.find().exec((err, localidades) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                })
            }
            Localidad.countDocuments((err, conteo) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err,
                    })
                }
                res.json({
                    ok: true,
                    localidades,
                    cuantos: conteo,
                })
            })
        })
    }

    static async getOne(req, res) {
        let id = req.params.id

        Localidad.findById(id).exec((err, localidadDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                })
            }
            if (!localidadDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es correcto',
                    },
                })
            }
            res.json({
                ok: true,
                localidad: localidadDB,
            })
        })
    }

    static async updateLocalidad(req, res) {
        let id = req.params.id
        let body = _.pick(req.body, ['name'])

        await Localidad.findByIdAndUpdate(id, body, (err, localidadDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                })
            } else {
                res.status(200).json({
                    ok: true,
                    localidad: {
                        message: `El localidad ${localidadDB.name} fue actualizado`,
                    },
                })
            }
        })
    }

    static async deleted(req, res) {
        const id = req.params.id
        console.log(id)

        await Localidad.findByIdAndDelete(id, (err, localidadDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                })
            } else {
                res.status(200).json({
                    ok: true,
                    localidad: {
                        message: `El localidad ${localidadDB.name} fue eliminado`,
                    },
                })
            }
        })
    }
}

module.exports = localidadController
