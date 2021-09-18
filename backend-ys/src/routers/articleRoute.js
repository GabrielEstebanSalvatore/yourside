const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const articuloController = require('../controllers/articleController')
const { v4: uuidv4 } = require('uuid')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/img/uploads'),
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + uuidv4() + file.originalname)
    },
})

const fileUpload = multer({ storage: storage }).single('image')

router.post('/articlesimages', fileUpload, async (req, res) => {
    await articuloController.createImage(req, res)
})

router.post('/articles', async (req, res) => {
    await articuloController.create(req, res)
})

router.get('/articles', async (req, res) => {
    await articuloController.getAll(req, res)
})

router.get('/articles/:id', async (req, res) => {
    await articuloController.get(req, res)
})
router.put('/articles/:id', async (req, res) => {
    await articuloController.update(req, res)
})

router.delete('/articles/:id', async (req, res) => {
    await articuloController.remove(req, res)
})

router.post('/soldarticles', async (req, res) => {
    await articuloController.soldArticles(req, res)
})

module.exports = router
