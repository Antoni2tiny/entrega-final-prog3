const TipoUsuario = require('../models/tipoUsuario'); // Asegúrate de que la ruta sea correcta

// Función para obtener todos los tipos de usuario
const obtenerTiposUsuario = async (req, res) => {
    try {
        const tipos = await TipoUsuario.findAll({ where: { activo: 1 } }); // Obtiene solo los tipos activos
        res.status(200).json(tipos);
    } catch (error) {
        console.error('Error al obtener tipos de usuario:', error);
        res.status(500).json({ mensaje: 'Error al obtener tipos de usuario.' });
    }
};

// Función para validar un tipo de usuario por ID
const validarTipoUsuario = async (id_tipo_usuario) => {
    try {
        const tipoUsuario = await TipoUsuario.findOne({ 
            where: { 
                id_tipo_usuario,
                activo: 1 // Asegúrate de que esté activo
            }
        });
        return tipoUsuario !== null; // Retorna true si existe y es activo
    } catch (error) {
        console.error('Error al validar tipo de usuario:', error);
        return false;
    }
};

module.exports = { obtenerTiposUsuario, validarTipoUsuario };
