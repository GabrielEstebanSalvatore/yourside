const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const boxController = require('../controllers/boxController')

router.post('/boxes', async (req, res) => {
    await boxController.create(req, res)
})

router.get('/boxes', async (req, res) => {
    await boxController.getAll(req, res)
})

router.get('/boxes/:id', async (req, res) => {
    await boxController.getOne(req, res)
})

router.put('/boxes/:id', async (req, res) => {
    await boxController.deleted(req, res)
})

module.exports = router
