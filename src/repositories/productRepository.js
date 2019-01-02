'use strict'

const Product = require('../models/product');



exports.get = () => {
    return Product.find(
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
};



exports.getBySlug = (slug) => {
    return Product.findOne(
        {
            active: true,
            slug: slug
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
};



exports.getByTag = (tag) => {
    return Product.find(
        {
            active: true,
            tags: tag
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
};



exports.getById = (id) => {
    return Product.findById(id);
};



exports.create = (data) => {
    return Product.create(data);
};



exports.update = (data) => {
    const { id, title, description, price, slug } = data

    return Product.findByIdAndUpdate(
        id,
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
};



exports.delete = (data) => {
    const { id } = data;

    return Product.findByIdAndRemove(id);
};