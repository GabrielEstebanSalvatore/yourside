const express = require('express')
const router = express.Router()
const offerController = require('../controllers/offerController')

router.post('/offers', async (req, res) => {
    await offerController.create(req, res)
})

router.get('/offers', async (req, res) => {
    await offerController.getAll(req, res)
})

router.get('/offers/:id', async (req, res) => {
    await offerController.get(req, res)
})

router.put('/offers/:id', async (req, res) => {
    await offerController.update(req, res)
})

router.delete('/offers/:id', async (req, res) => {
    await offerController.remove(req, res)
})

module.exports = router
