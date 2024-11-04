const { DataTypes } = require('sequelize');
const db = require('../database');

const TipoReclamo = db.define('TipoReclamo', {
  id_tipo_reclamo: {
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
  tableName: 'tipos_reclamo',
  timestamps: false
});

module.exports = TipoReclamo;
