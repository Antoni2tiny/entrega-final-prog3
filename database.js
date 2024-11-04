const { Sequelize } = require('sequelize');

// Configuración de la conexión a MySQL
const sequelize = new Sequelize('gestion_reclamo', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

// Función para autenticar la conexión a la base de datos
const conectarBD = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa a la base de datos');
  } catch (err) {
    console.error('Error de conexión:', err);
    process.exit(1); // Termina el proceso si no se puede conectar
  }
};

// Llamar a la función de conexión
conectarBD();

module.exports = sequelize;
