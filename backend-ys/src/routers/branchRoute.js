const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const branchController = require('../controllers/branchController')

router.post('/branches', async (req, res) => {
    ;[check('name', 'El nombre es obligatorio').not().isEmpty()],
        await branchController.create(req, res)
})

router.get('/branches', async (req, res) => {
    await branchController.getAll(req, res)
})

router.get('/branches/:id', async (req, res) => {
    await branchController.getOne(req, res)
})

router.put('/branches/:id', async (req, res) => {
    await branchController.updateBranch(req, res)
})

router.delete('/branches/:id', async (req, res) => {
    await branchController.deleted(req, res)
})

module.exports = router
