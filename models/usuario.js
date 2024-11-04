const { DataTypes } = require('sequelize');
const db = require('../database');
const TipoUsuario = require('./tipoUsuario');

const Usuario = db.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: { 
    type: DataTypes.STRING(256), 
    allowNull: false 
  },
  apellido: { 
    type: DataTypes.STRING(256), 
    allowNull: false 
  },
  correo_electronico: { 
    type: DataTypes.STRING(256), 
    allowNull: false, 
    unique: true
  },
  contrasenia: { 
    type: DataTypes.STRING(256), 
    allowNull: false 
  },
  id_tipo_usuario: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
  activo: { 
    type: DataTypes.TINYINT(4), 
    allowNull: false, 
    defaultValue: 1
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

// Relaciones
Usuario.belongsTo(TipoUsuario, { foreignKey: 'id_tipo_usuario', as: 'tipo_usuario' });
TipoUsuario.hasMany(Usuario, { foreignKey: 'id_tipo_usuario', as: 'usuarios' });

module.exports = Usuario;
