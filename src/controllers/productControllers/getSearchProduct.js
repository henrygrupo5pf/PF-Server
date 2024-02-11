const { Product } = require('../../db');
const { Op } = require('sequelize');

const getSearchProduct = async (name, page = 1, pageSize = 10) => {
    try {
        const { count, rows: products } = await Product.findAndCountAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
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
};

module.exports = getSearchProduct;
