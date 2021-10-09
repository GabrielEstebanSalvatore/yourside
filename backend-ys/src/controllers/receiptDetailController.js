const receiptDetailService = require('../services/receiptDetailService')

class receiptDetailController {
    static async getAll(req, res) {
        try {
            const response = await receiptDetailService.getAll()
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async get(req, res) {
        try {
            const response = await receiptDetailService.get(req.params.id)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async create(req, res) {
        try {
            const response = await receiptDetailService.create(req)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async update(req, res) {
        try {
            const response = await receiptDetailService.update(
                req.params.id,
                req.body
            )
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async remove(req, res) {
        try {
            const response = await receiptDetailService.remove(req.params.id)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }
}

module.exports = receiptDetailController

// const ReceiptDetail = require('../models/receipt/receiptDetailModel')
// const _ = require('underscore')
// const { validationResult } = require('express-validator')

// class comprobanteDetalleController {
//     static async create(req, res) {
//         // revisar si hay errores
//         const errores = validationResult(req)
//         if (!errores.isEmpty()) {
//             return res.status(400).json({ errores: errores.array() })
//         }
//         // const{article,amount,price,state} = req.body;

//         try {
//             let comprobanteDetalle = new ReceiptDetail(req.body)
//             await comprobanteDetalle.save()
//         } catch (error) {
//             console.log(error)
//             res.status(400).send('Hubo un error')
//         }
//     }

//     static async getAll(req, res) {
//         await ReceiptDetail.find()
//             .populate('article')
//             .exec((err, comprobanteDetalles) => {
//                 if (err) {
//                     return res.status(400).json({
//                         ok: false,
//                         err,
//                     })
//                 }
//                 ReceiptDetail.countDocuments((err, conteo) => {
//                     if (err) {
//                         return res.status(400).json({
//                             ok: false,
//                             err,
//                         })
//                     }
//                     res.json({
//                         ok: true,
//                         comprobanteDetalles,
//                         cuantos: conteo,
//                     })
//                 })
//             })
//     }

//     static async getOne(req, res) {
//         let id = req.params.id

//         ReceiptDetail.findById(id)
//             .populate('article')
//             .exec((err, comprobanteDetalleDB) => {
//                 if (err) {
//                     return res.status(500).json({
//                         ok: false,
//                         err,
//                     })
//                 }
//                 if (!comprobanteDetalleDB) {
//                     return res.status(400).json({
//                         ok: false,
//                         err: {
//                             message: 'El ID no es correcto',
//                         },
//                     })
//                 }
//                 res.json({
//                     ok: true,
//                     comprobanteDetalle: comprobanteDetalleDB,
//                 })
//             })
//     }

//     static async updateComprobanteDetalle(req, res) {
//         let id = req.params.id
//         let body = _.pick(req.body, ['article', 'amount', 'price', 'state'])

//         await ReceiptDetail.findByIdAndUpdate(
//             id,
//             body,
//             (err, comprobanteDetalleDB) => {
//                 if (err) {
//                     return res.status(400).json({
//                         ok: false,
//                         err,
//                     })
//                 } else {
//                     res.status(200).json({
//                         ok: true,
//                         comprobanteDetalle: {
//                             message: `El comprobante Detalle ${comprobanteDetalleDB.name} fue actualizado`,
//                         },
//                     })
//                 }
//             }
//         )
//     }

//     static async deleted(req, res) {
//         const id = req.params.id
//         let comprobanteDetalle = await ReceiptDetail.findById(id)
//         let body = { available: !comprobanteDetalle.available }

//         await ReceiptDetail.findByIdAndUpdate(
//             id,
//             body,
//             (err, comprobanteDetalleDB) => {
//                 if (err) {
//                     return res.status(500).json({
//                         ok: false,
//                         err,
//                     })
//                 } else {
//                     res.status(200).json({
//                         ok: true,
//                         ComprobanteDetalle: {
//                             message: `El comprobante Detalle ${comprobanteDetalleDB.name} fue modificado`,
//                         },
//                     })
//                 }
//             }
//         )
//     }
// }

// module.exports = comprobanteDetalleController
