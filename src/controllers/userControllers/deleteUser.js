const { User } = require('../../db');


const deleteUser = async (id) => {
    try {
        
        const resultado = await User.destroy({
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

module.exports = deleteUser;
