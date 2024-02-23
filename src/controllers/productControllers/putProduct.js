// const { Product } = require('../../db');

// const putProduct = async ({ id, cost, activeStatus, photo, name, description, category }) => {
//     let updateFields = {};
//     if (cost && cost >= 0) {
//         updateFields.cost = cost;
//     }
//      if (typeof activeStatus !== 'undefined') {
//         updateFields.activeStatus = activeStatus;
//     }

//     if(name){
//         updateFields.name = name;
//     }

//     if(description){
//         updateFields.description = description;
//     }

//     if(category){
//         updateFields.category = category;
//     }

//     if(photo){
//         updateFields.photo = photo;
//     }

//     if (Object.keys(updateFields).length === 0) {
//         return {error: 'No valid fields to update.'};
//     }

//     const [updatedRowsCount] = await Product.update(updateFields, {
//         where: { id: id },
//     });

//     if (updatedRowsCount > 0) {
//         return {message: 'Product updated successfully.'};
//     } else {
//         return {error: 'Product not found.'};
//     }
// };

// module.exports = putProduct;
const { Product } = require('../../db');

const putProduct = async ({id, cost, activeStatus, photo, name, description, category }) => {
    let updateFields = {};
    if (cost !== undefined && cost >= 0) {
        updateFields.cost = cost;
    }
    // Corregido para manejar correctamente la activación y desactivación
    if (typeof activeStatus !== 'undefined') {
        updateFields.activeStatus = activeStatus;
    }

    if(name){
        updateFields.name = name;
    }

    if(description){
        updateFields.description = description;
    }

    if(category){
        updateFields.category = category;
    }

    if(photo){
        updateFields.photo = photo;
    }

    if (Object.keys(updateFields).length === 0) {
        return {error: 'No valid fields to update.'};
    }
    

    try {
        const [updatedRowsCount, [updatedProduct]] = await Product.update(updateFields, {
            where: { id: id },
            returning: true, // Esta opción es específica de algunos dialectos en Sequelize como PostgreSQL
        });

        if (updatedRowsCount > 0) {
            return { message: 'Product updated successfully.', product: updatedProduct };
        } else {
            return { error: 'Product not found.' };
        }
    } catch (error) {
        console.error('Error updating product:', error);
        return { error: error.message };
    }
};

module.exports = putProduct;
