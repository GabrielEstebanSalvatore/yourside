const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const clientController = require('../controllers/clientController')

router.post('/clients', async (req, res) => {
    await clientController.create(req, res)
})
router.post('/clientstrolley', async (req, res) => {
    await clientController.updateTrolley(req, res)
})
router.get('/clients', async (req, res) => {
    await clientController.getAll(req, res)
})

router.get('/clients/:id', async (req, res) => {
    await clientController.get(req, res)
})
router.put('/clients/:id', async (req, res) => {
    await clientController.update(req, res)
})

router.delete('/clients/:id', async (req, res) => {
    await clientController.remove(req, res)
})

module.exports = router
