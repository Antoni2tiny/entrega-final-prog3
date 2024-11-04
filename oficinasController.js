const Oficina = require('../models/oficina');

// Obtener oficinas según el tipo de reclamo
const obtenerOficinasPorTipo = async (req, res) => {
  const { id_tipo_reclamo } = req.query;

  try {
    const oficinas = await Oficina.findAll({
      where: { id_tipo_reclamo, activo: 1 } // Filtrar por tipo de reclamo y oficinas activas
    });
    res.status(200).json(oficinas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener oficinas', error });
  }
};

module.exports = { obtenerOficinasPorTipo };
