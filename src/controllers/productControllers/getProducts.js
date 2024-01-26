// controllers/productControllers.js

const { Product } = require('../db.js');

// Controlador para obtener todos los productos
async function getProducts() {
    try {
        // Utiliza el modelo ProductService para obtener todos los productos
        const products = await Product.findAll();
        return products; // Devuelve la lista de productos
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir
        return { error: error.message };
    }
}

module.exports = { 
    getProducts,
    
};

