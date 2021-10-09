const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const receiptDetailController = require('../controllers/receiptDetailController')

router.post('/receiptsdetail', async (req, res) => {
    await receiptDetailController.create(req, res)
})

router.get('/receiptsdetail', async (req, res) => {
    await receiptDetailController.getAll(req, res)
})

router.get('/receiptsdetail/:id', async (req, res) => {
    await receiptDetailController.get(req, res)
})
router.put('/receiptsdetail/:id', async (req, res) => {
    await receiptDetailController.update(req, res)
})

router.delete('/receiptsdetail/:id', async (req, res) => {
    await receiptDetailController.remove(req, res)
})

module.exports = router
