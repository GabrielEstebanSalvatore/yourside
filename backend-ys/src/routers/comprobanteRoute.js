const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const comprobanteController = require('../controllers/comprobanteController')

router.post(
    '/comprobante',
    [check('name', 'El nombre es obligatorio').not().isEmpty()],
    async (req, res) => {
        await comprobanteController.create(req, res)
    }
)

router.post('/comprobantes', async (req, res) => {
    await comprobanteController.getAll(req, res)
})

router.get('/comprobantes', async (req, res) => {
    await comprobanteController.getAllAdmin(req, res)
})

router.get('/comprobante/:id', async (req, res) => {
    await comprobanteController.getOne(req, res)
})
router.put('/comprobante/:id', async (req, res) => {
    await comprobanteController.updateComprobante(req, res)
})

router.delete('/comprobante/:id', async (req, res) => {
    await comprobanteController.deleted(req, res)
})

module.exports = router
