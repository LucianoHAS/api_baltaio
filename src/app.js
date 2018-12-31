'use strict'

const express = require('express');
const app = express();


// Carregamento das rotas
const indexRoutes = require('./routes/index');
const productsRoutes = require('./routes/products');


// Configuração
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Rotas
app.use('/', indexRoutes);
app.use('/products', productsRoutes);


module.exports = app;