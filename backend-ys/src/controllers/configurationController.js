const Configuration = require('../models/configurationModel')
const _ = require('underscore')
const { validationResult } = require('express-validator')

class configurationController {
    static async create(req, res) {
        const errores = validationResult(req)

        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() })
        }

        try {
            let configuration = new Configuration()
            configuration.name = req.body.name
            configuration.adminCode = req.body.adminCode
            configuration.demo = req.body.demo
            configuration.lastSellName = req.body.lastSellName
            configuration.useDecimal = req.body.useDecimal
            configuration.address = req.body.address
            configuration.cellPhone = req.body.cellPhone

            await configuration.save()

            res.json({
                ok: true,
                message: 'Configuración creada con Exito',
                configuration,
            })
        } catch (error) {
            console.log(error)
            res.status(400).send('Hubo un error')
        }
    }

    static async getAll(req, res) {
        var response = await Configuration.findOne().exec(
            (err, configuration) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err,
                    })
                }
                res.json({
                    ok: true,
                    configuration,
                })
            }
        )
    }

    static async updateConfiguration(req, res) {
        let id = req.params.id
        let body = _.pick(req.body, [
            'name',
            'adminCode',
            'demo',
            'lastSellName',
            'useDecimal',
            'address',
            'cellPhone',
        ])

        await Configuration.findByIdAndUpdate(
            id,
            body,
            (err, configurationDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err,
                    })
                } else {
                    res.status(200).json({
                        ok: true,
                        message: `La configuración ${configurationDB.name} fue actualizada`,
                    })
                }
            }
        )
    }
}

module.exports = configurationController
