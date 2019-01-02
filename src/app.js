'use strict'

const express = require('express');
const mongoose = require('mongoose');

const configDB = require('./config/database.json');

const app = express();


// Conexão com o banco de dados
mongoose.connect(configDB.dbUri, configDB.options);
mongoose.Promise = global.Promise;


// Carregamento das rotas
const indexRoutes = require('./routes/indexRoute');
const productRoutes = require('./routes/productRoute');


// Configuração
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Rotas
app.use('/', indexRoutes);
app.use('/products', productRoutes);


module.exports = app;