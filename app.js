var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express(); // Inicializa el objeto 'app'

// Archivos de rutas por cada entidad
const studentsRouter = require('./routes/students');
const usuariosRouter = require ('./routes/usuarios')


const port = 4000;

// Configuración del motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas

app.get('/', (req, res) => {
  res.redirect('/usuarios');
});


app.use('/students', studentsRouter);
app.use('/usuarios', usuariosRouter);

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).render('404', { title: '404 Not Found' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: '500 Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;
