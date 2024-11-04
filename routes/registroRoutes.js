const express = require('express');
const router = express.Router();
const { registrarUsuario } = require('../controllers/authController'); // Importa el controlador

// Ruta para registrar un nuevo usuario
router.post('/auth/register', registrarUsuario);

module.exports = router;
