const express = require('express');
const router = express.Router();
const { check } =require('express-validator')

const comprobanteDetalleController = require('../controllers/comprobanteDetalleController');


router.post('/comprobantedetalle', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
    ],
    async (req, res)=>{await comprobanteDetalleController.create(req,res);},
);

router.get('/comprobantedetalle', async (req, res )=>{
    await comprobanteDetalleController.getAll(req, res);
});

router.get('/comprobantedetalle/:id', async (req, res )=>{
    await comprobanteDetalleController.getOne(req, res);
});
router.put('/comprobantedetalle/:id', async (req, res)=>{
    await comprobanteDetalleController.updateComprobanteDetalle(req,res);
});

router.delete('/comprobantedetalle/:id', async (req,res)=>{
    await comprobanteDetalleController.deleted(req,res);
});

module.exports = router;