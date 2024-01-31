const { Op } = require("sequelize");
const { Product, User } = require('../../db');

const getFilteredAndPaginatedProducts = async (page = 1, pageSize = 10, category, minCost, maxCost, country, location) => {
    const filterCriteria = {
        category,
        cost: {
            [Op.gte]: minCost || 0,
            [Op.lte]: maxCost || Number.MAX_SAFE_INTEGER,
        },
    };

    if (country) {
        filterCriteria['$User.country$'] = country;
    }

    if (location) {
        filterCriteria['$User.location$'] = location;
    }

    const cleanedFilterCriteria = Object.fromEntries(
        Object.entries(filterCriteria).filter(([_, value]) => value != null)
    );

    try {
        const products = await Product.findAll({
            where: cleanedFilterCriteria,
            offset: (page - 1) * pageSize,
            limit: pageSize,
            include: {
                model: User,
                attributes: ["name", "id"]
            }
        });
        return products;
    } catch (error) {
        throw error;
    }
};

module.exports = getFilteredAndPaginatedProducts;
