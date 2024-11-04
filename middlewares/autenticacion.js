const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generar un token JWT
const generarToken = (usuario) => {
    try {
        const token = jwt.sign(
            { id: usuario.id_usuario, tipo_usuario: usuario.id_tipo_usuario }, // Asegúrate de que el campo tipo_usuario sea correcto
            'clave_secreta', // Reemplaza 'clave_secreta' por tu clave secreta en un entorno seguro
            { expiresIn: '1h' } // El token expira en 1 hora
        );
        console.log('Token generado correctamente para el usuario:', usuario.id_usuario); // Confirmación en consola
        return token;
    } catch (error) {
        console.error('Error al generar el token:', error); // Registro de error en consola
        throw new Error('Error al generar el token');
    }
};

// Verificar JWT
const verificarToken = (req, res, next) => {
    const token = req.cookies.token; // Asegúrate de que el token esté almacenado en cookies
    if (!token) {
        console.warn('Acceso denegado: No se proporcionó un token'); // Advertencia en consola
        return res.status(401).json({ mensaje: 'Acceso denegado' });
    }

    try {
        const usuario = jwt.verify(token, 'clave_secreta'); // Reemplaza 'clave_secreta' por tu clave secreta
        req.usuario = usuario; // Agrega el usuario decodificado a la solicitud
        console.log('Token verificado correctamente para el usuario:', usuario.id); // Confirmación en consola
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error); // Registro de error en consola
        return res.status(401).json({ mensaje: 'Token no válido' });
    }
};

// Verificar el rol del usuario
const verificarRol = (rolesPermitidos) => (req, res, next) => {
    if (!req.usuario) {
        console.warn('Acceso no autorizado: No se ha verificado al usuario');
        return res.status(401).json({ mensaje: 'Acceso no autorizado: usuario no verificado' });
    }

    console.log('Roles permitidos:', rolesPermitidos);
    console.log('Rol del usuario:', req.usuario.tipo_usuario);

    if (!rolesPermitidos.includes(req.usuario.tipo_usuario)) {
        console.warn('Acceso no autorizado para el rol:', req.usuario.tipo_usuario);
        return res.status(403).json({ mensaje: 'Acceso no autorizado' });
    }

    console.log('Acceso autorizado para el rol:', req.usuario.tipo_usuario);
    next();
};

module.exports = { generarToken, verificarToken, verificarRol };
