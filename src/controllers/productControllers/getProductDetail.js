const { User, Product } = require('../../db');
const { Op } = require("sequelize")

const getProductDetail = async (id) => {
    const dbProduct = await Product.findByPk(id, {
        include: {
            model: User,
            attributes: ["name", "id"]
        }
    });
    if (!dbProduct) {
        throw new Error("Product not found");
    }

    return dbProduct;
};

module.exports = getProductDetail;