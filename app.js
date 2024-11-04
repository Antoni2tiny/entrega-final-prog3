const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const morgan = require('morgan');
const db = require('./database');
const authRoutes = require('./routes/authRoutes');
const reclamosRoutes = require('./routes/reclamosRoutes');
const oficinasRoutes = require('./routes/oficinasRoutes');
const tipoReclamoRoutes = require('./routes/tipoReclamoRoutes');
const pagesRoutes = require('./routes/pagesRoutes');
const tipoUsuarioRoutes = require('./routes/tipoUsuarioRoutes'); 

const app = express();
const port = 3002;

// Configuración de Handlebars con helpers
const expressHandlebars = require('express-handlebars');

app.engine(
  'handlebars',
  expressHandlebars.engine({
    defaultLayout: 'main',
    helpers: {
      eq: (a, b) => a === b, // Helper para comparar igualdad
    },
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// Middlewares
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', pagesRoutes);
app.use('/auth', authRoutes);
app.use('/reclamos', reclamosRoutes);
app.use('/oficinas', oficinasRoutes);
app.use('/api/tipos-reclamo', tipoReclamoRoutes);
app.use('/api/tipos-usuario', tipoUsuarioRoutes);

// Middleware para manejar errores 404
app.use((req, res, next) => {
  res.status(404).render('error', { title: '404 - Página No Encontrada', mensaje: 'La página que buscas no existe.' });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err.message);
  console.error(err.stack);
  res.status(500).render('error', { title: 'Error Interno', mensaje: 'Ocurrió un error en el servidor.' });
});

// Iniciar servidor después de conectarse a la base de datos
db.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error);
  });

module.exports = app;
