const { User, ProductService } = require('../db');

const getProducts = async (limit, offset) => {
    return await ProductService.findAll({
        limit: limit,
        offset: offset,
    });
};


