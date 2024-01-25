// controllers/productControllers.js

const { ProductService } = require('../db.js');

// Controlador para obtener todos los productos
async function getProducts() {
    try {
        // Utiliza el modelo ProductService para obtener todos los productos
        const products = await ProductService.findAll();
        return products; // Devuelve la lista de productos
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir
        return { error: error.message };
    }
}

module.exports = { 
    getProducts,
    
};

