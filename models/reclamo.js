const { DataTypes } = require('sequelize');
const db = require('../database');
const Usuario = require('./usuario');
const Oficina = require('./oficina');
const TipoReclamo = require('./tipoReclamo');

const Reclamo = db.define('Reclamo', {
  id_reclamo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  asunto: { 
    type: DataTypes.STRING(256), 
    allowNull: false 
  },
  descripcion: { 
    type: DataTypes.TEXT, 
    allowNull: true 
  },
  fecha_creado: { 
    type: DataTypes.DATE, 
    allowNull: false, 
    defaultValue: DataTypes.NOW 
  },
  fecha_finalizado: { 
    type: DataTypes.DATE, 
    allowNull: true 
  },
  fecha_cancelado: { 
    type: DataTypes.DATE, 
    allowNull: true 
  },
  id_estado_reclamo: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  id_tipo_reclamo: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  id_usuario_creador: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  id_usuario_finalizador: { 
    type: DataTypes.INTEGER, 
    allowNull: true 
  },
  id_oficina: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  }
}, {
  tableName: 'reclamos',
  timestamps: false
});

// Definición de relaciones
Reclamo.belongsTo(Usuario, { as: 'creador', foreignKey: 'id_usuario_creador' });
console.log('Asociación Reclamo -> Usuario como creador creada con éxito');

Reclamo.belongsTo(Usuario, { as: 'finalizador', foreignKey: 'id_usuario_finalizador' });
console.log('Asociación Reclamo -> Usuario como finalizador creada con éxito');

Reclamo.belongsTo(Oficina, { foreignKey: 'id_oficina' });
console.log('Asociación Reclamo -> Oficina creada con éxito');

Reclamo.belongsTo(TipoReclamo, { foreignKey: 'id_tipo_reclamo' });
console.log('Asociación Reclamo -> TipoReclamo creada con éxito');

module.exports = Reclamo;
