const Article = require('../models/article/articleModel')
const Receipt = require('../models/receipt/receiptModel')
const Ticket = require('../models/ticket')
const ReceiptDetail = require('../models/receipt/receiptDetailModel')
const Configuration = require('../models/configuration/configurationModel')
const Box = require('../models/cashRegister/cashRegisterModel')
const _ = require('underscore')
const articleService = require('../services/articleService')

class articleController {
    static async getAll(req, res) {
        try {
            var response = await articleService.getAll()
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async get(req, res) {
        try {
            const response = await articleService.get(req.params.id)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async create(req, res) {
        try {
            const response = await articleService.create(req)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async update(req, res) {
        try {
            const response = await articleService.update(
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
            const response = await articleService.remove(req.params.id)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }
    static async createImage(req, res) {
        try {
            const response = await articleService.createImage(req)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async articlesSold(req, res) {
        const body = req.body.trolley
        const cliente = req.body.client

        let idArray = []
        let totalPrice = 0

        try {
            //ARMADO DEL COMPROBANTE DETALLE
            for (const element of body) {
                idArray.push(element._id)
                totalPrice += element.sellPrice
            }

            let comprobanteDetalle = new ReceiptDetail({
                article: idArray,
                price: totalPrice,
            })

            let respuestaComprobanteDetalle = await comprobanteDetalle.save()
            //MODIFICO LA CONFIGURACION
            //ARMADO DEL COMPROBANTE
            let configuration = await Configuration.findOne()
            let comprobante = new Receipt({
                number: configuration.lastSellName,
                client: cliente._id,
                comprobantDetail: respuestaComprobanteDetalle._id,
                price: totalPrice,
            })
            await comprobante.save()

            for (const element of body) {
                try {
                    var articule = await Article.findOne({ _id: element._id })
                    var id = articule._id
                    await Article.replaceOne(
                        { id },
                        { amount: articule.amount-- }
                    )
                    await articule.save()
                } catch (error) {
                    return res.status(200).json({
                        ok: true,
                        message: `Error in the sale`,
                    })
                }
            }

            //CREO EL TICKET
            const ticket = new Ticket({
                number: configuration.lastSellName++,
                desk: null,
            })

            await ticket.save()

            let condiguracionId = configuration._id
            await Configuration.replaceOne(
                { condiguracionId },
                { lastSellName: configuration.lastSellName++ }
            )
            await Configuration.save()

            //MODIFICO LA CAJA
            const currentBox = await Box.findOne({
                closeBoxDate: {
                    $eq: null,
                },
            })

            currentBox.comprobantes.push(comprobante._id)
            currentBox.comprobantesAmount++
            currentBox.totalSales += totalPrice

            await currentBox.save()

            return res.status(200).json({
                ok: true,
                message: `Successfully sale`,
            })
        } catch (error) {
            return res.status(500).json({
                ok: false,
                error,
                response: { message: `Error in the sale` },
            })
        }
    }
}

module.exports = articleController
