const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarToken } = require('../middlewares/autenticacion');

// Registro de usuario
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, contrasena, tipo_usuario } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const nuevoUsuario = await Usuario.create({
      nombre,
      apellido,
      correo,
      contrasena: hashedPassword,
      tipo_usuario
    });

    console.log('Usuario registrado correctamente:', nuevoUsuario);  // Confirmación en consola
    res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error al registrar usuario:', error);  // Registro del error en consola
    res.status(500).json({ mensaje: 'Error al registrar el usuario', error });
  }
};

// Iniciar sesión

const iniciarSesion = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario || !bcrypt.compareSync(contrasena, usuario.contrasena)) {
      console.warn('Intento de inicio de sesión fallido: correo o contraseña incorrectos'); // Advertencia en consola
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const token = generarToken(usuario);
    console.log('Inicio de sesión exitoso para el usuario:', usuario.correo); // Confirmación en consola
    res.cookie('token', token, { httpOnly: true });

    // Redirige al usuario a la página correspondiente según su rol
    if (usuario.tipo_usuario === 'cliente') {
      return res.json({ mensaje: 'Inicio de sesión exitoso', redirect: '/reclamos' });
    } else if (usuario.tipo_usuario === 'empleado') {
      return res.json({ mensaje: 'Inicio de sesión exitoso', redirect: '/empleado/reclamos' });
    } else if (usuario.tipo_usuario === 'administrador') {
      return res.json({ mensaje: 'Inicio de sesión exitoso', redirect: '/admin/dashboard' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error); // Registro del error en consola
    res.status(500).json({ mensaje: 'Error en el servidor al iniciar sesión', error });
  }
};

// Cerrar sesión
const cerrarSesion = (req, res) => {
  try {
    res.clearCookie('token');
    console.log('Sesión cerrada correctamente');  // Confirmación en consola
    res.json({ mensaje: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);  // Registro del error en consola
    res.status(500).json({ mensaje: 'Error en el servidor al cerrar sesión', error });
  }
};

module.exports = { registrarUsuario, iniciarSesion, cerrarSesion };
