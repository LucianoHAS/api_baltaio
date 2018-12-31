'use strict';

const Product = require('../models/product');

exports.post = async (req, res, next) => {
    try {
        await Product.create(req.body);
        res.status(201).send({ message: 'Produto cadastrado com sucesso' });

    } catch (err) {
        res.status(400).send({
            error: 'Erro ao cadastrar produto',
            data: err
        });

    };
};

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};