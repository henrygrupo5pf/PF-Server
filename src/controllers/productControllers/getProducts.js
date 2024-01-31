const { Product } = require('../../db.js');

const getProducts = async (page = 1, pageSize = 10) => {
    try {
        const { count, rows: products } = await Product.findAndCountAll({
            offset: (page - 1) * pageSize,
            limit: pageSize,
        });

        const totalPages = Math.ceil(count / pageSize);

        return {
            products,
            totalPages,
        };
    } catch (error) {
        throw error;
    }
}

module.exports = getProducts;