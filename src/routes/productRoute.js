'use strict';

const express = require('express');
const router = express.Router();

// Controolers
const controller = require('../controllers/productController');


// Rotas para CRUD de produtos
router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;