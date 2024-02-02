const getFilteredAndPaginatedProducts = async (page = 1, pageSize = 10, category, minCost, maxCost, name) => {
    const filterCriteria = {
        category,
        name: {
            [Op.iLike]: `%${name}%`, // Case-insensitive search for name
        },
        cost: {
            [Op.gte]: minCost || 0,
            [Op.lte]: maxCost || Number.MAX_SAFE_INTEGER,
        },
    };

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