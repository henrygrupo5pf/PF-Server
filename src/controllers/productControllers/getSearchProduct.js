const { Product } = require('../../db');
const { Op } = require('sequelize');

const getSearchProduct = async (name) => {
    try {
        const product = await Product.findOne({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        });
         return product
    } catch (error) {
        throw error;
    }
};

module.exports = getSearchProduct;

