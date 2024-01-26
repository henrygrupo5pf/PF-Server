const { Product, User } = require('../../db');
const { Op } = require("sequelize")

const filterProducts = async (category, minCost, maxCost) => {
    const filterCriteria = {
        category,
        cost: {
            [Op.gte]: minCost || 0,
            [Op.lte]: maxCost || Number.MAX_SAFE_INTEGER,
        },
    };

    const cleanedFilterCriteria = Object.fromEntries(
        Object.entries(filterCriteria).filter(([_, value]) => value != null)
    );

    const products = await Product.findAll({
        where: cleanedFilterCriteria,
        include: {
            model: User,
            attributes: ["name", "id"]
        }
    });
    if (!products) {
        throw new Error('There are no products with these characteristics.')
    }

    return products;
};

module.exports = filterProducts;