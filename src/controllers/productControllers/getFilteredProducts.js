const { Product } = require('../../db');

const filterProducts = async (category, minCost, maxCost) => {
    const filterCriteria = {
        category,
        cost: {
          [Sequelize.Op.and]: [
            { [Sequelize.Op.gte]: minCost || 0 },
            { [Sequelize.Op.lte]: maxCost || Number.MAX_SAFE_INTEGER },
          ],
        },
    };

    const cleanedFilterCriteria = Object.fromEntries(
        Object.entries(filterCriteria).filter(([_, value]) => value != null)
    );

    const products = await Product.findAll({
        where: cleanedFilterCriteria,
    });

    return products;
};

module.exports = filterProducts;