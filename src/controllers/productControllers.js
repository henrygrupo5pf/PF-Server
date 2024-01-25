const { User, ProductService } = require('../db');

const getProducts = async () => {
    const paises = await ProductService.findAll({
        include: [{
            model: User,
            attributes: ["name"],
        }],
    });
    return paises;
};

module.exports = {
    getProducts,
};