'use strict';

const Product = require('../models/product');
const ValidationContract = require('../validators/validator');
const productRepository = require('../repositories/productRepository');



exports.get = async (req, res) => {
    try {
        const products = await productRepository.get();

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
        const product = await productRepository.getBySlug(req.params.slug)

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
        const product = await productRepository.getById(req.params.id);

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
        const products = await productRepository.getByTag(req.params.tag);

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
        await productRepository.create(req.body);
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
        const product = await productRepository.update(req.body);

        res.status(200).send({
            message: 'Produto atualizado com sucesso',
            new: product
        });

    } catch (err) {
        res.status(400).send({
            error: "Erro ao atualizar o produto",
            data: err
        });
    };
};



exports.delete = async (req, res) => {
    try {
        await productRepository.delete(req.body)

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