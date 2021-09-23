const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const brandController = require('../controllers/brandController')

router.post('/brands', async (req, res) => {
    ;[check('name', 'El nombre es obligatorio').not().isEmpty()],
        await brandController.create(req, res)
})

router.get('/brands', async (req, res) => {
    await brandController.getAll(req, res)
})

router.get('/brands/:id', async (req, res) => {
    await brandController.getOne(req, res)
})

router.put('/brands/:id', async (req, res) => {
    await brandController.updateBranch(req, res)
})

router.delete('/brands/:id', async (req, res) => {
    await brandController.deleted(req, res)
})

module.exports = router
