const db = require('./database'); // Asegúrate de que esta ruta sea correcta
const { TipoReclamo } = require('./models/tipoReclamo'); // Asegúrate de que la ruta sea correcta

async function pruebaCRUD() {
    try {
      // Crear
      const nuevoTipoReclamo = await TipoReclamo.create({
        descripcion: 'Descripción de la queja', // Mantén la descripción
        activo: true, // Asegúrate de incluir este campo
      });
      console.log('Tipo de reclamo creado:', nuevoTipoReclamo.toJSON());
  
      // Leer
      const tiposReclamo = await TipoReclamo.findAll();
      console.log('Tipos de reclamo existentes:', tiposReclamo.map(tr => tr.toJSON()));
  
      // Actualizar
      const tipoReclamo = await TipoReclamo.findByPk(nuevoTipoReclamo.id_tipo_reclamo);
      if (tipoReclamo) {
        tipoReclamo.descripcion = 'Descripción actualizada de la queja';
        await tipoReclamo.save();
        console.log('Tipo de reclamo actualizado:', tipoReclamo.toJSON());
      }
  
      // Borrar
      await TipoReclamo.destroy({ where: { id_tipo_reclamo: nuevoTipoReclamo.id_tipo_reclamo } });
      console.log('Tipo de reclamo eliminado');
  
      // Leer después de borrar
      const tiposReclamoFinal = await TipoReclamo.findAll();
      console.log('Tipos de reclamo después de la eliminación:', tiposReclamoFinal.map(tr => tr.toJSON()));
      
    } catch (error) {
      console.error('Error en las pruebas CRUD:', error);
    }
  }
pruebaCRUD();
  