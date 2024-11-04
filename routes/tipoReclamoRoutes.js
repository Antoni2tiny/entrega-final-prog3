const express = require('express');
const { obtenerTiposReclamo } = require('../controllers/tipoReclamoController');

const router = express.Router();

// Ruta para obtener tipos de reclamo
router.get('/', obtenerTiposReclamo);

module.exports = router;
