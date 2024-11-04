const db = require('./database'); // Asegúrate de ajustar esta ruta al archivo de tu configuración

const sincronizarDB = async () => {
  try {
    await db.sync({ alter: true }); // Usa { force: true } para eliminar y recrear tablas
    console.log('Sincronización completa');
  } catch (error) {
    console.error('Error en la sincronización:', error);
  }
};

sincronizarDB();
