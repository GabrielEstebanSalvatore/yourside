const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const configurationController = require('../controllers/configurationController')

router.post(
    '/configuration',
    [check('name', 'El nombre es obligatorio').not().isEmpty()],
    async (req, res) => {
        await configurationController.create(req, res)
    }
)

router.get('/configuration', async (req, res) => {
    await configurationController.getAll(req, res)
})

router.get('/configuration/:id', async (req, res) => {
    await configurationController.get(req, res)
})
router.put('/configuration/:id', async (req, res) => {
    await configurationController.update(req, res)
})

module.exports = router
