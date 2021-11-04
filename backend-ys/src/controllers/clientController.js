const clientService = require('../services/clientService')

class clientController {
    static async getAll(req, res) {
        try {
            const response = await clientService.getAll()
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async get(req, res) {
        try {
            const response = await clientService.get(req.params.id)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async create(req, res) {
        try {
            const response = await clientService.create(req)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async update(req, res) {
        try {
            const response = await clientService.update(req.params.id, req.body)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async remove(req, res) {
        try {
            const response = await clientService.remove(req.params.id)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }
    static async updateTrolley(req, res) {
        try {
            const response = await clientService.updateTrolley(req)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }
}

module.exports = clientController

// const Cliente = require('../models/clienteModel')
// const Trolley = require('../models/trolleyModel')
// const _ = require('underscore')
// const { validationResult } = require('express-validator')
// const bcryptjs = require('bcryptjs')

// class clienteController {

//     static async updateTrolley(req, res) {
//         console.log(req.body)
//         let client = req.body.client
//         let trolleyC = { articles: req.body.trolleyClient }

//         await Trolley.findByIdAndUpdate(
//             client._id,
//             trolleyC,
//             (err, trolleyDB) => {
//                 if (err) {
//                     return res.status(400).json({
//                         ok: false,
//                         err,
//                     })
//                 } else {
//                     res.status(200).json({
//                         ok: true,
//                         cliente: trolleyDB,
//                     })
//                 }
//             }
//         )
//     }

// module.exports = clienteController
