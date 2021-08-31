const boxService = require('../services/boxService')

const Box = require('../models/boxModel')
const Comprabante = require('../models/comprabanteModel')
const { validationResult } = require('express-validator')

class boxController {
    static async create(req, res) {
        const errores = validationResult(req)

        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() })
        }

        const { number, totalSales, comprobantes } = req.body

        try {
            let boxNuevo = new Box({
                //totalSales:totalSales,
                //comprobantes:comprobantes,
                number: number,
            })

            await boxNuevo.save().then(
                res.json({
                    ok: true,
                    box: boxNuevo,
                    message: 'La caja se creo con exito',
                })
            )
        } catch (error) {
            console.log(error)
            res.status(400).send('Hubo un error')
        }
    }

    static async getAll(req, res) {
        // var boxes = await Box.findOne({
        //     closeBoxDate: {
        //     $eq: null
        // }});

        //     var response = await boxService.getCurrentBox(boxes)
        //     console.log(response)

        await Box.find({ available: 1 }).exec((err, boxes) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                })
            }

            Box.countDocuments((err, conteo) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        err,
                    })
                }
                res.json({
                    ok: true,
                    boxes,
                    cuantos: conteo,
                })
            })
        })
    }

    static async getOne(req, res) {
        let id = req.params.id

        Box.findById(id).exec((err, boxDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                })
            }
            if (!boxDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es correcto',
                    },
                })
            }
            res.json({
                ok: true,
                box: boxDB,
            })
        })
    }

    static async deleted(req, res) {
        let id = req.params.id

        let box = await Box.findById(id)
        let body = { available: !box.available }

        await Box.findByIdAndUpdate(id, body, (err, boxDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                })
            } else {
                res.status(200).json({
                    ok: true,
                    box: {
                        message: `La caja ${boxDB.name} fue modificada`,
                    },
                })
            }
        })
    }
}

module.exports = boxController
