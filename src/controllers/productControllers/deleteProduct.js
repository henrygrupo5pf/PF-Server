const { Product } = require('../../db');


const deleteProduct = async (id) => {
    try {
        
        const resultado = await Product.destroy({
          where: {
            id: id
          }
        });
    
        if (resultado === 1) {
          return {message: 'Dato eliminado correctamente.'}
        } else {
          throw new Error('No se encontró el dato con el ID especificado.');
        }
      } catch (error) {
        console.error('Error al intentar eliminar el dato:', error);
      }
};

module.exports = deleteProduct;