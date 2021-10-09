const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const cashRegisterController = require('../controllers/cashRegisterController')

router.post('/cashregisters', async (req, res) => {
    await cashRegisterController.create(req, res)
})

router.get('/cashregisters', async (req, res) => {
    await cashRegisterController.getAll(req, res)
})

router.get('/cashregisters/:id', async (req, res) => {
    await cashRegisterController.get(req, res)
})

router.delete('/cashregisters/:id', async (req, res) => {
    await cashRegisterController.remove(req, res)
})

module.exports = router
