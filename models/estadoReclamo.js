const { DataTypes } = require('sequelize');
const db = require('../database');

const EstadoReclamo = db.define('EstadoReclamo', {
  id_estado_reclamo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: { 
    type: DataTypes.STRING(256), 
    allowNull: false 
  },
  activo: { 
    type: DataTypes.TINYINT(4), 
    allowNull: false 
  }
}, {
  tableName: 'estados_reclamo',
  timestamps: false
});

// Funciones CRUD
const crearEstadoReclamo = async (descripcion, activo) => {
  try {
    const nuevoEstado = await EstadoReclamo.create({ descripcion, activo });
    console.log('Estado de reclamo creado:', nuevoEstado);
    return nuevoEstado;
  } catch (error) {
    console.error('Error al crear EstadoReclamo:', error);
    throw error;
  }
};

const obtenerEstadosReclamo = async () => {
  try {
    return await EstadoReclamo.findAll();
  } catch (error) {
    console.error('Error al obtener EstadosReclamo:', error);
    throw error;
  }
};

const actualizarEstadoReclamo = async (id, descripcion, activo) => {
  try {
    const [actualizado] = await EstadoReclamo.update({ descripcion, activo }, {
      where: { id_estado_reclamo: id }
    });
    return actualizado ? 'Estado de reclamo actualizado con éxito.' : 'Estado de reclamo no encontrado.';
  } catch (error) {
    console.error('Error al actualizar EstadoReclamo:', error);
    throw error;
  }
};

const eliminarEstadoReclamo = async (id) => {
  try {
    const eliminado = await EstadoReclamo.destroy({
      where: { id_estado_reclamo: id }
    });
    return eliminado ? 'Estado de reclamo eliminado con éxito.' : 'Estado de reclamo no encontrado.';
  } catch (error) {
    console.error('Error al eliminar EstadoReclamo:', error);
    throw error;
  }
};

module.exports = {
  EstadoReclamo,
  crearEstadoReclamo,
  obtenerEstadosReclamo,
  actualizarEstadoReclamo,
  eliminarEstadoReclamo
};
