const { DataTypes } = require('sequelize');
const db = require('../database');
const TipoReclamo = require('./tipoReclamo');

const Oficina = db.define('Oficina', {
  id_oficina: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_oficina: { 
    type: DataTypes.STRING(256), 
    allowNull: false 
  },
  id_tipo_reclamo: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  activo: { 
    type: DataTypes.TINYINT(4), 
    allowNull: false, 
    defaultValue: 1 
  }
}, {
  tableName: 'oficinas',
  timestamps: false
});

// Relaciones
Oficina.belongsTo(TipoReclamo, { foreignKey: 'id_tipo_reclamo' });
TipoReclamo.hasMany(Oficina, { foreignKey: 'id_tipo_reclamo' });

module.exports = Oficina;
