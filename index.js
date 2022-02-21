// const express = require('express');
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import { config } from 'dotenv';

config({ path: 'variables.env' });

// TODO: Inicializa app
const app = express();
// TODO:conectar a la base de datos
db.authenticate()
    .then(() => console.log('base de datos conectada'))
    .catch((err) => console.log(err));
// TODO: Habilitar Pug
app.set('view engine', 'pug');

// TODO: Crear un middleware y obtener el año actuu para pasarlo como variable a las vistas
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de viajes';
    next();
});

// TODO: agregar body parser para leer los datos
app.use(express.urlencoded({ extended: true }));

// TODO: Definir la carpeta publica
app.use(express.static('public/'));
// TODO: Agregar puerto
app.use('/', router);

// TODO: Definir puerto
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});
