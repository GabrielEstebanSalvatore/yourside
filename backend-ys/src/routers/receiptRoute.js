const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const receiptController = require('../controllers/receiptController')

router.post('/receipts', async (req, res) => {
    await receiptController.create(req, res)
})

router.post('/receipts', async (req, res) => {
    await receiptController.getAll(req, res)
})

router.get('/receipts', async (req, res) => {
    await receiptController.getAll(req, res)
})

router.get('/receipts/:id', async (req, res) => {
    await receiptController.get(req, res)
})
router.put('/receipts/:id', async (req, res) => {
    await receiptController.update(req, res)
})

router.delete('/receipts/:id', async (req, res) => {
    await receiptController.remove(req, res)
})

module.exports = router
