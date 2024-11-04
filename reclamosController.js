const Reclamo = require('../models/reclamo');
const TipoReclamo = require('../models/tipoReclamo');
const Oficina = require('../models/oficina');

// Cargar formulario de reclamo
const cargarFormularioReclamo = async (req, res) => {
    try {
        const tiposReclamo = await TipoReclamo.findAll({ where: { activo: 1 } });
        const oficinas = await Oficina.findAll({ where: { activo: 1 } });
        res.render('reclamos/crear', { tiposReclamo, oficinas, title: 'Crear Reclamo' });
    } catch (error) {
        console.error('Error al cargar el formulario de creación de reclamo:', error);
        res.status(500).json({ mensaje: 'Error al cargar el formulario' });
    }
};

// Crear un nuevo reclamo
const crearReclamo = async (req, res) => {
    const { asunto, descripcion, id_tipo_reclamo, id_oficina } = req.body;
    try {
        const nuevoReclamo = await Reclamo.create({
            asunto,
            descripcion,
            id_tipo_reclamo,
            id_oficina,
            id_usuario: req.usuario.id // Asigna el ID del usuario que creó el reclamo
        });
        console.log('Reclamo creado correctamente:', nuevoReclamo);
        res.redirect('/reclamos');
    } catch (error) {
        console.error('Error al crear reclamo:', error);
        res.status(500).json({ mensaje: 'Error al crear reclamo' });
    }
};

// Listar reclamos de un cliente
const listarReclamosCliente = async (req, res) => {
    try {
        const reclamos = await Reclamo.findAll({
            where: { id_usuario: req.usuario.id },
            include: [TipoReclamo, EstadoReclamo]
        });
        res.render('reclamos/listaReclamos', { reclamos, title: 'Mis Reclamos' });
    } catch (error) {
        console.error('Error al listar reclamos:', error);
        res.status(500).send('Error al listar reclamos');
    }
};


// Cancelar un reclamo
const cancelarReclamo = async (req, res) => {
    const { id } = req.params;
    try {
        const reclamo = await Reclamo.findByPk(id);
        if (!reclamo) {
            return res.status(404).json({ mensaje: 'Reclamo no encontrado' });
        }
        await reclamo.update({ estado: 'cancelado' });
        console.log('Reclamo cancelado correctamente:', reclamo);
        res.redirect('/reclamos');
    } catch (error) {
        console.error('Error al cancelar reclamo:', error);
        res.status(500).json({ mensaje: 'Error al cancelar reclamo' });
    }
};

// Actualizar el estado de un reclamo
const actualizarEstadoReclamo = async (req, res) => {
    const { id } = req.params;
    const { nuevoEstado } = req.body; // Se asume que se envía el nuevo estado en el body
    try {
        const reclamo = await Reclamo.findByPk(id);
        if (!reclamo) {
            return res.status(404).json({ mensaje: 'Reclamo no encontrado' });
        }
        await reclamo.update({ estado: nuevoEstado });
        console.log('Estado del reclamo actualizado correctamente:', reclamo);
        res.redirect('/empleado/reclamos'); // Redirigir a la lista de reclamos
    } catch (error) {
        console.error('Error al actualizar el estado del reclamo:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el estado del reclamo' });
    }
};
async function obtenerReclamo(req, res) {
    try {
      const { id } = req.params;
      const reclamo = await Reclamo.findByPk(id, {
        include: [TipoReclamo, Oficina]
      });
      if (!reclamo) {
        return res.status(404).json({ error: 'Reclamo no encontrado' });
      }
      res.json(reclamo);
    } catch (error) {
      console.error('Error al obtener reclamo:', error);
      res.status(500).json({ error: 'Error al obtener reclamo' });
    }
}
  
module.exports = {
    cargarFormularioReclamo,
    crearReclamo,
    listarReclamosCliente,
    cancelarReclamo,
    actualizarEstadoReclamo,
    obtenerReclamo
};
