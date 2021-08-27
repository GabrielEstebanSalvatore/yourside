const express = require('express');
const router = express.Router();
const { check } =require('express-validator')

const clienteController = require('../controllers/clienteController');

router.post('/clientes',
    async (req, res)=>{await clienteController.create(req,res);}
);
router.post('/clientestrolley',
    async (req, res)=>{await clienteController.updateTrolley(req,res);}
);
router.get('/clientes', async (req, res )=>{
    await clienteController.getAll(req, res);
});

router.get('/clientes/:id', async (req, res )=>{
    await clienteController.getOne(req, res);
});
router.put('/clientes/:id', async (req, res)=>{
    await clienteController.updateCliente(req,res);
});

router.delete('/clientes/:id', async (req,res)=>{
    await clienteController.deleted(req,res);
});


module.exports = router;