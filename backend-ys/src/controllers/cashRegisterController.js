const cashRegisterService = require('../services/cashRegisterService')

const Checkout = require('../models/cashRegister/cashRegisterModel')
const Comprabante = require('../models/comprabanteModel')
const { validationResult } = require('express-validator')

class cashRegisterController {
    static async getAll(req, res) {
        try {
            const response = await cashRegisterService.getAll()
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async get(req, res) {
        try {
            const response = await cashRegisterService.get(req.params.id)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async create(req, res) {
        try {
            const response = await cashRegisterService.create(req)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async remove(req, res) {
        try {
            const response = await cashRegisterService.remove(req.params.id)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }
}

module.exports = cashRegisterController
