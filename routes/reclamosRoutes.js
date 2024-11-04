const express = require('express');
const { verificarToken, verificarRol } = require('../middlewares/autenticacion');
const {
  crearReclamo,
  listarReclamosCliente,
  cancelarReclamo,
  actualizarEstadoReclamo,
  cargarFormularioReclamo,
  obtenerReclamo,
  listarReclamosOficina,
  listarReclamosTipo,
} = require('../controllers/reclamosController');

const router = express.Router();

// Middleware para manejar errores y registrar en consola
const manejarErrores = (funcion) => {
  return async (req, res, next) => {
    try {
      await funcion(req, res, next);
    } catch (error) {
      console.error('Error en la ruta:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };
};

// Rutas para clientes
router.get('/crear', verificarToken, verificarRol([3]), manejarErrores(cargarFormularioReclamo));
router.post('/crear', verificarToken, verificarRol([3]), manejarErrores(crearReclamo));
router.get('/reclamos', verificarToken, verificarRol([3]), manejarErrores(listarReclamosCliente));

// Rutas para administradores
router.get('/admin/reclamos', verificarToken, verificarRol([1]), manejarErrores(listarReclamosOficina));

router.put('/cancelar/:id', verificarToken, verificarRol([3]), manejarErrores(cancelarReclamo));
router.get('/reclamo/:id', verificarToken, verificarRol([3]), manejarErrores(obtenerReclamo));

// Rutas para empleados
router.get('/empleado/reclamos', verificarToken, verificarRol([2]), manejarErrores(async (req, res) => {
  console.log('Accediendo a la lista de reclamos como empleado:', req.usuario.id);
  const reclamos = await Reclamo.findAll();
  res.render('reclamosEmpleado', { reclamos, title: 'Lista de Reclamos' });
}));
router.put('/actualizar-estado/:id', verificarToken, verificarRol([2]), manejarErrores(actualizarEstadoReclamo));

module.exports = router;
