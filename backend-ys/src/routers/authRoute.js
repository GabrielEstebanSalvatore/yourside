const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Iniciar sesión
router.post('/auth', 
    authController.AuthenticateClient
);

// Obtiene el usuario autenticado
router.get('/auth',
    auth,
    authController.AuthenticatedClient
);

module.exports = router;