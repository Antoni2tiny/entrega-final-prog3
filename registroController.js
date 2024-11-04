const Usuario = require('../models/usuario'); // Modelo de Usuario
const { validarTipoUsuario } = require('./tipoUsuarioController'); // Importa la función de validación
const bcrypt = require('bcryptjs');

// Controlador de registro
const registrarUsuario = async (req, res) => {
    const { nombre, apellido, correo_electronico, contrasenia, id_tipo_usuario } = req.body;

    try {
        // Validación del tipo de usuario
        const tipoUsuarioValido = await validarTipoUsuario(id_tipo_usuario);

        if (!tipoUsuarioValido) {
            return res.status(400).render('auth/register', { 
                title: 'Crear Usuario', 
                error: 'Tipo de usuario no válido o inactivo.' 
            });
        }

        // Hash de la contraseña
        const contraseniaHash = await bcrypt.hash(contrasenia, 10);

        // Crear el nuevo usuario
        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            correo_electronico,
            contrasenia: contraseniaHash,
            id_tipo_usuario,
        });

        res.status(201).json({ mensaje: 'Usuario registrado con éxito', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).render('auth/register', { 
            title: 'Crear Usuario', 
            error: 'Ocurrió un error al registrar el usuario.' 
        });
    }
};

module.exports = { registrarUsuario };
