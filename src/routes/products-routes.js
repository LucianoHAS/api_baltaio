'use strict';

const express = require('express');
const router = express.Router();

// Controolers
const controller = require('../controllers/products-controllers');


// Rotas para CRUD de produtos
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;