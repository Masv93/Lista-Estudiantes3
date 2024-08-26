const mysql = require('mysql2');
require('dotenv').config();
const pool = mysql.createConnection({
    host: process.env.BASEDATOSHOST,
    user: process.env.BASEDATOSUSUARIO,
    password: process.env.BASEDATOSCLAVE,
    database: process.env.BASEDATOSNOMBRE
});

pool.connect(function(error){
    if (error) {
        console.error('Error conectando a la base de datos:', error);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

module.exports = pool;
