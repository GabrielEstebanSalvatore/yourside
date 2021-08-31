const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const tipoArticuloController = require('../controllers/tipoArticuloController')

router.post(
    '/tipoarticulos',
    [check('name', 'El nombre es obligatorio').not().isEmpty()],
    async (req, res) => {
        await tipoArticuloController.create(req, res)
    }
)

router.get('/tipoarticulos', async (req, res) => {
    await tipoArticuloController.getAll(req, res)
})

router.get('/tipoarticulos/:id', async (req, res) => {
    await tipoArticuloController.getOne(req, res)
})
router.put('/tipoarticulos/:id', async (req, res) => {
    await tipoArticuloController.updateTipoArticulo(req, res)
})

router.delete('/tipoarticulos/:id', async (req, res) => {
    await tipoArticuloController.deleted(req, res)
})

module.exports = router
