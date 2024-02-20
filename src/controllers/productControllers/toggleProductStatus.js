
// async function toggleProductActiveStatus(req, res) {
//     const { productId } = req.params; // El ID del producto viene de la URL
//     try {
//       // Encuentra el producto por ID
//       const product = await sequelize.models.Product.findByPk(productId);
//       if (product) {
//         // Cambia el estado de activeStatus al opuesto de su estado actual
//         product.activeStatus = !product.activeStatus;
//         await product.save(); // Guarda el cambio en la base de datos
  
//         res.status(200).json({ 
//           message: `Product ${product.activeStatus ? 'activated' : 'deactivated'} successfully.`,
//           product: product
//         });
//       } else {
//         res.status(404).json({ message: "Product not found." });
//       }
//     } catch (error) {
//       res.status(500).json({ message: "Error toggling the active status of the product", error: error.message });
//     }
//   }
  
//   module.exports = {
//     // ... (exportar otros métodos del controlador)
//     toggleProductActiveStatus,
//   };
  
// controllers/productControllers/toggleProductStatus.js

const { Product } = require('../../models/Product'); // Asegúrate de que la ruta es correcta

async function toggleProductActiveStatus(req, res) {
    const { productId } = req.params;
    try {
        const product = await Product.findByPk(productId);
        if (product) {
            product.activeStatus = !product.activeStatus;
            await product.save();

            res.status(200).json({ 
                message: `Product ${product.activeStatus ? 'activated' : 'deactivated'} successfully.`,
                product: product
            });
        } else {
            res.status(404).json({ message: "Product not found." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error toggling the active status of the product", error: error.message });
    }
}

module.exports = toggleProductActiveStatus; // Exportación como módulo único
