const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Usuario = require('../models/usuario'); // Importa el modelo Usuario

// Ruta para mostrar el formulario de inicio de sesión
router.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Iniciar Sesión' });
});

// Ruta para mostrar el formulario de registro
router.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Crear Usuario' });
});

// Ruta para registrar usuario
router.post('/register', async (req, res) => {
    const { nombre, apellido, correo_electronico, contrasenia, id_tipo_usuario } = req.body;

    try {
        console.log('Datos recibidos en el registro:', req.body);

        // Verificar si el correo ya está registrado
        const usuarioExistente = await Usuario.findOne({ where: { correo_electronico } });
        if (usuarioExistente) {
            return res.status(400).render('auth/register', { 
                title: 'Crear Usuario', 
                error: 'El correo electrónico ya está registrado.' 
            });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contrasenia, 10);

        // Crear el nuevo usuario en la base de datos
        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            correo_electronico,
            contrasenia: hashedPassword,
            id_tipo_usuario,
            activo: 1
        });

        console.log('Usuario registrado correctamente:', nuevoUsuario);
        res.redirect('/auth/login');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).render('auth/register', { 
            title: 'Crear Usuario', 
            error: 'Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.' 
        });
    }
});

// Ruta para procesar el inicio de sesión
router.post('/login', async (req, res) => {
    const { correo_electronico, contrasenia } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ where: { correo_electronico } });
        if (!usuario) {
            return res.status(401).render('auth/login', { 
                title: 'Iniciar Sesión', 
                error: 'Correo o contraseña incorrectos' 
            });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if (!isPasswordValid) {
            return res.status(401).render('auth/login', { 
                title: 'Iniciar Sesión', 
                error: 'Correo o contraseña incorrectos' 
            });
        }

        // Generar el token de sesión
        const token = jwt.sign({ id: usuario.id_usuario, tipo_usuario: usuario.id_tipo_usuario }, 'clave_secreta', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 }); // Guardar el token en una cookie

        // Verificar y redirigir según el tipo de usuario
        console.log('Tipo de usuario al iniciar sesión:', usuario.id_tipo_usuario); // Log para verificar el tipo

        if (usuario.id_tipo_usuario === 3) {  // Cliente
            res.redirect('/reclamos'); // Ruta para cliente
        } else if (usuario.id_tipo_usuario === 2) {  // Empleado
            res.redirect('/empleado/reclamos'); // Ruta para empleado
        } else if (usuario.id_tipo_usuario === 1) {  // Administrador
            res.redirect('/admin'); // Ruta para administrador
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).render('auth/login', { 
            title: 'Iniciar Sesión', 
            error: 'Ocurrió un error en el servidor. Inténtalo de nuevo más tarde.' 
        });
    }
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    console.log('Sesión cerrada correctamente');
    res.redirect('/auth/login');
});

module.exports = router;
