const express = require('express');
const router = express.Router();
const { obtenerTiposUsuario } = require('../controllers/tipoUsuarioController');

// Ruta para obtener todos los tipos de usuario
router.get('/', obtenerTiposUsuario);

module.exports = router;
