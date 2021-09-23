const Brand = require('../models/brandModel')
const _ = require('underscore')
const { validationResult } = require('express-validator')
const brandService = require('../services/brandService')

class brandController {
    static async create(req, res) {
        try {
            const response = await brandService.create(req)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async getAll(req, res) {
        try {
            const response = await brandService.getAll()
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async getOne(req, res) {
        let id = req.params.id

        Branch.findById(id).exec((err, branchDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                })
            }
            if (!branchDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El ID no es correcto',
                    },
                })
            }
            res.json({
                ok: true,
                brancg: branchDB,
            })
        })
    }

    static async updateBranch(req, res) {
        let id = req.params.id
        let body = _.pick(req.body, ['name'])

        await Branch.findByIdAndUpdate(id, body, (err, branchDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                })
            } else {
                res.status(200).json({
                    ok: true,
                    localidad: {
                        message: `La marca ${branchDB.name} fue actualizado`,
                    },
                })
            }
        })
    }

    static async deleted(req, res) {
        let id = req.params.id
        let branch = await Branch.findById(id)
        let body = { available: !branch.available }

        await Branch.findByIdAndUpdate(id, body, (err, branchDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                })
            } else {
                res.status(200).json({
                    ok: true,
                    branch: {
                        message: `La marca ${branchDB.name} fue modificada`,
                    },
                })
            }
        })
    }
}

module.exports = brandController
