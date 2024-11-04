// controllers/tipoReclamoController.js
const TipoReclamo = require('../models/tipoReclamo'); // Asegúrate de que la ruta sea correcta

// Obtener tipos de reclamo
const obtenerTiposReclamo = async (req, res) => {
  try {
    const tiposReclamo = await TipoReclamo.findAll(); // Asumiendo que estás usando Sequelize
    res.status(200).json(tiposReclamo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener tipos de reclamo', error });
  }
};

module.exports = { obtenerTiposReclamo };
