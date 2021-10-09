const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const articleTypeController = require('../controllers/articleTypeController')

router.post(
    '/articlestype',
    [check('name', 'The name field is required').not().isEmpty()],
    async (req, res) => {
        await articleTypeController.create(req, res)
    }
)

router.get('/articlestype', async (req, res) => {
    await articleTypeController.getAll(req, res)
})

router.get('/articlestype/:id', async (req, res) => {
    await articleTypeController.get(req, res)
})
router.put('/articlestype/:id', async (req, res) => {
    await articleTypeController.update(req, res)
})

router.delete('/articlestype/:id', async (req, res) => {
    await articleTypeController.remove(req, res)
})

module.exports = router
