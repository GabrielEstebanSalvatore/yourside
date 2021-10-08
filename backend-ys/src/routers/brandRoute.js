const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const brandsController = require('../controllers/brandsController')

router.post('/brands', async (req, res) => {
    ;[check('name', 'El nombre es obligatorio').not().isEmpty()],
        await brandsController.create(req, res)
})

router.get('/brands', async (req, res) => {
    await brandsController.getAll(req, res)
})

router.get('/brands/:id', async (req, res) => {
    await brandsController.get(req, res)
})

router.put('/brands/:id', async (req, res) => {
    await brandsController.update(req, res)
})

router.delete('/brands/:id', async (req, res) => {
    await brandsController.remove(req, res)
})

module.exports = router
