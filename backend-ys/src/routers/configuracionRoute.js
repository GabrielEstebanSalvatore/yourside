const express = require('express');
const router = express.Router();
const { check } =require('express-validator')

const configurationController = require('../controllers/configurationController');


router.post('/configuracion', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
    ],
    async (req, res)=>{await configurationController.create(req,res);},
);

router.get('/configuracion', async (req, res )=>{
    await configurationController.getAll(req, res);
});

router.get('/configuracion/:id', async (req, res )=>{
    await configurationController.getOne(req, res);
});
router.put('/configuracion/:id', async (req, res)=>{
    await configurationController.updateConfiguration(req,res);
});

module.exports = router;