const { Product } = require('../../db');

const putProduct = async ({id, cost, activeStatus, photo, name, description, category }) => {
    let updateFields = {};
    if (cost && cost >= 0) {
        updateFields.cost = cost;
    }
    if (activeStatus) {
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
    

    const [updatedRowsCount] = await Product.update(updateFields, {
        where: { id: id },
    });

    if (updatedRowsCount > 0) {
        return {message: 'Product updated successfully.'};
    } else {
        return {error: 'Product not found.'};
    }
};

module.exports = putProduct;
