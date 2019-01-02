'use strict';

const express = require('express');
const router = express.Router();

// Controolers
const controller = require('../controllers/productController');

// Rotas para CRUD de produtos
router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);
router.post('/', controller.post);
router.put('/', controller.put);
router.delete('/', controller.delete);

module.exports = router;