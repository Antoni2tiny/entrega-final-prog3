const express = require('express');
const { verificarToken, verificarRol } = require('../middlewares/autenticacion');
const oficinasController = require('../controllers/oficinasController');
const router = express.Router();
const { obtenerOficinasPorTipo } = require('../controllers/oficinasController');

// Manejo de errores para los controladores
const manejarErrores = (funcion) => {
  return async (req, res, next) => {
    try {
      await funcion(req, res, next);
    } catch (error) {
      console.error('Error en la ruta:', error); // Registra el error en consola
      res.status(500).json({ message: 'Error interno del servidor' }); // Respuesta general al cliente
    }
  };
};

// Rutas de oficinas
router.post('/crear', verificarToken, verificarRol(['admin']), manejarErrores(oficinasController.crearOficina));
router.put('/editar/:id', verificarToken, verificarRol(['admin']), manejarErrores(oficinasController.editarOficina));
router.delete('/eliminar/:id', verificarToken, verificarRol(['admin']), manejarErrores(oficinasController.eliminarOficina));
router.get('/listar', verificarToken, verificarRol(['admin']), manejarErrores(oficinasController.listarOficinas));

// Ruta para obtener oficinas según el tipo de reclamo (autenticada pero sin restricción de rol específico)
router.get('/api/oficinas', verificarToken, manejarErrores(obtenerOficinasPorTipo));

module.exports = router;
