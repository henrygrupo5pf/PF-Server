const { Product } = require('../../db.js');

const getProducts= async()=>{
    try {
        const products = await Product.findAll();
        return products;  
    } catch (error) {
        throw error;  
    }
}


module.exports = getProducts;
