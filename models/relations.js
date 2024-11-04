const Usuario = require('./usuario');
const TipoUsuario = require('./tipoUsuario');

// Relación de Usuario a TipoUsuario
Usuario.belongsTo(TipoUsuario, {
  foreignKey: 'id_tipo_usuario',
  as: 'tipo_usuario'
});

// Relación de TipoUsuario a Usuario
TipoUsuario.hasMany(Usuario, {
  foreignKey: 'id_tipo_usuario',
  as: 'usuarios'
});
