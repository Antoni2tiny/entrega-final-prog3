const express = require('express');
const router = express.Router();

// Ruta para la Portada
router.get('/', async (req, res, next) => {
    try {
        res.render('portada', { title: 'Bienvenido a la Gestión de Reclamos' });
    } catch (error) {
        next(error);  // Enviar error al middleware global
    }
});

// Opciones de usuario común
router.get('/usuario-comun', async (req, res, next) => {
    try {
        res.render('usuarioComun', {
            title: 'Opciones de Usuario Común',
            opciones: [
                { path: '/auth/register', texto: 'Crear Usuario' },
                { path: '/auth/login', texto: 'Iniciar Sesión' },
                { path: '/reclamos/crear', texto: 'Crear Reclamo' },
                { path: '/reclamos', texto: 'Ver Estado de Reclamos' },
            ]
        });
    } catch (error) {
        next(error);
    }
});

// Opciones de administrador/empleado
router.get('/administracion', async (req, res, next) => {
    try {
        res.render('administracion', {
            title: 'Opciones de Administración',
            opciones: [
                { path: '/admin/oficinas', texto: 'Gestión de Oficinas' },
                { path: '/admin/tipos-reclamo', texto: 'Gestión de Tipos de Reclamo' },
                { path: '/admin/informes/pdf', texto: 'Generar Informe PDF' },
                { path: '/admin/informes/csv', texto: 'Generar Informe CSV' },
            ]
        });
    } catch (error) {
        next(error);
    }
});

// Ruta para Información Institucional
router.get('/info', async (req, res, next) => {
    try {
        res.render('info', { title: 'Información Institucional' });
    } catch (error) {
        next(error);
    }
});

// Ruta para Contacto
router.get('/contacto', async (req, res, next) => {
    try {
        res.render('contacto', { title: 'Contacto' });
    } catch (error) {
        next(error);
    }
});

// Ruta para enviar mensaje de contacto
router.post('/contacto/enviar', async (req, res, next) => {
    try {
        const { nombre, email, mensaje } = req.body;
        console.log(`Mensaje recibido de ${nombre} (${email}): ${mensaje}`);
        res.redirect('/contacto');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
