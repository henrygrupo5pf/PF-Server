const { Product } = require('../../db.js');

const getProducts = async (page = 1, pageSize = 10) => {
    try {
        const products = await Product.findAll({
            offset: (page - 1) * pageSize,
            limit: pageSize,
        });
        return products;
    } catch (error) {
        throw error;
    }
}


module.exports = getProducts;
