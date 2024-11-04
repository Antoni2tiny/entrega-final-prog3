const express = require('express');
const { verificarToken, verificarRol } = require('../middlewares/autenticacion');
const administracionController = require('../controllers/administracionController');
const router = express.Router();

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

// Rutas de administración
router.post('/tipos-reclamo', verificarToken, verificarRol(['admin']), manejarErrores(administracionController.crearTipoReclamo));
router.get('/tipos-reclamo', verificarToken, verificarRol(['admin']), manejarErrores(administracionController.listarTiposReclamos));
router.get('/reclamos/informe-pdf', verificarToken, verificarRol(['admin']), manejarErrores(administracionController.generarInformePDF));
router.get('/reclamos/informe-csv', verificarToken, verificarRol(['admin']), manejarErrores(administracionController.generarInformeCSV));

module.exports = router;
