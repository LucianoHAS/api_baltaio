'use strict';

const Product = require('../models/product');
const ValidationContract = require('../validators/validator');

exports.get = async (req, res) => {
    try {
        const products = await Product.find(
            {
                active: true
            },
            {
                '_id': 0,
                'title': 1,
                'price': 1,
                'slug': 1
            }
        );

        res.status(200).send(products);

    } catch (err) {
        res.status(400).send({
            error: "Erro ao buscar lista de produtos cadastrados",
            data: err
        });
    };
};

exports.getBySlug = async (req, res) => {
    try {
        const product = await Product.findOne(
            {
                active: true,
                slug: req.params.slug
            },
            {
                '_id': 0,
                'title': 1,
                'description': 1,
                'price': 1,
                'slug': 1,
                'tags': 1
            }
        );

        res.status(200).send(product);

    } catch (err) {
        res.status(400).send({
            error: "Erro ao obter o produto pelo slug",
            data: err
        });
    };
};

exports.getById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).send(product);

    } catch (err) {
        res.status(400).send({
            error: "Erro ao buscar pelo ID",
            data: err
        });
    };
};

exports.getByTag = async (req, res) => {
    try {
        const products = await Product.find(
            {
                active: true,
                tags: req.params.tag,
            },
            {
                '_id': 0,
                'title': 1,
                'description': 1,
                'price': 1,
                'slug': 1,
                'tags': 1
            }
        );

        res.status(200).send(products);

    } catch (err) {
        res.status(400).send({
            error: "Erro ao buscar lista de produtos cadastrados",
            data: err
        });
    };
};

exports.post = async (req, res) => {
    let contract = new ValidationContract();

    const { title, slug, description } = req.body;

    contract.hasMinLen(title, 3, 'O título deve conter ao menos três caracteres');
    contract.hasMinLen(slug, 3, 'O slug deve conter ao menos três caracteres');
    contract.hasMinLen(description, 3, 'A descrição deve conter ao menos três caracteres');

    //Se contiver dados invalidos
    if (!contract.isValid())
        return res.status(400).send(contract.errors()).end();

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

exports.put = async (req, res) => {
    try {
        const { title, description, price, slug } = req.body

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                price,
                slug
            },
            {
                new: true
            }
        );

        res.status(200).send({
            message: 'Produto atualizado com sucesso',
            new: product
        })

    } catch (err) {
        res.status(400).send({
            error: "Erro ao atualizar o produto",
            data: err
        });
    };
};

exports.delete = async (req, res) => {
    try {
        await Product.findOneAndRemove(req.params.id)

        res.status(200).send({
            message: "Produto removido com sucesso"
        })

    } catch (err) {
        res.status(400).send({
            error: "Erro ao remover o produto",
            data: err
        });
    };
};