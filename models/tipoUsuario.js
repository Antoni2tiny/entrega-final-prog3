const { DataTypes } = require('sequelize');
const db = require('../database');

const TipoUsuario = db.define('TipoUsuario', {
  id_tipo_usuario: {
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
  tableName: 'tipos_usuario',
  timestamps: false
});

module.exports = TipoUsuario;
