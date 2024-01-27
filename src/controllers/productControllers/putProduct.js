const { Product } = require('../../db');

const putProduct = async ({ id, cost, activeStatus }) => {
    let updateFields = {};
    if (cost !== undefined && cost >= 0) {
        updateFields.cost = cost;
    }
    if (activeStatus !== undefined) {
        updateFields.activeStatus = activeStatus;
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