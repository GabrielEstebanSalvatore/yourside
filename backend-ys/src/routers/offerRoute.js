const express = require('express')
const router = express.Router()
const offerController = require('../controllers/offerController')

router.post('/offer', async (req, res) => {
    await offerController.create(req, res)
})

router.get('/offer', async (req, res) => {
    await offerController.getAll(req, res)
})

router.get('/offer/:id', async (req, res) => {
    await offerController.getOne(req, res)
})

router.post('/offer/:id', async (req, res) => {
    await offerController.updateOffer(req, res)
})

router.put('/offer/:id', async (req, res) => {
    await offerController.deleted(req, res)
})

module.exports = router
