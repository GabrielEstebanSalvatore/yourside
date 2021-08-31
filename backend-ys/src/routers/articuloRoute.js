const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const articuloController = require('../controllers/articuloController')
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

router.post('/articulosimagen', fileUpload, async (req, res) => {
    await articuloController.createImage(req, res)
})

router.post('/articulos', async (req, res) => {
    await articuloController.create(req, res)
})

router.get('/articulos', async (req, res) => {
    await articuloController.getAll(req, res)
})

router.get('/articulos/:id', async (req, res) => {
    await articuloController.getOne(req, res)
})
router.put('/articulos/:id', async (req, res) => {
    await articuloController.updateArticulo(req, res)
})

router.delete('/articulos/:id', async (req, res) => {
    await articuloController.deleted(req, res)
})

router.post('/articulosvendidos', async (req, res) => {
    await articuloController.soldArticles(req, res)
})

module.exports = router
