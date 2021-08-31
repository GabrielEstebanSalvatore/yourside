const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const localidadController = require('../controllers/localidadController')

router.post(
    '/localidades',

    async (req, res) => {
        await localidadController.create(req, res)
    }
)

router.get('/localidades', async (req, res) => {
    await localidadController.getAll(req, res)
})

router.get('/localidades/:id', async (req, res) => {
    await localidadController.getOne(req, res)
})
router.put('/localidades/:id', async (req, res) => {
    await localidadController.updateLocalidad(req, res)
})

router.delete('/localidades/:id', async (req, res) => {
    await localidadController.deleted(req, res)
})

module.exports = router
