const articleTypeService = require('../services/articleTypeService')

class articleTypeController {
    static async getAll(req, res) {
        try {
            const response = await articleTypeService.getAll()
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async get(req, res) {
        try {
            const response = await articleTypeService.get(req.params.id)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async create(req, res) {
        try {
            const response = await articleTypeService.create(req)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }

    static async update(req, res) {
        try {
            const response = await articleTypeService.update(
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
            const response = await articleTypeService.remove(req.params.id)
            res.status(response.status).json(response.content)
        } catch (err) {
            res.send(err)
        }
    }
}

module.exports = articleTypeController
