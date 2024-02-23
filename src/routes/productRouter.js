


const { Router } = require("express");
const { 
    getProductsHandler,
    getSearchProductHandler,
    getProductDetailHandler,
    getFilteredAndPaginatedProductsHandler,
    postProductHandler,
    putProductHandler,
    getActiveProductsHandler,
    deleteProductHandler
    // No importes toggleProductActiveStatus desde aquí si no está en este archivo
} = require('../handlers/productHandlers');

// const  toggleProductActiveStatus  = require('../controllers/productControllers/toggleProductStatus');

const productRouter = Router();

productRouter.get('/', getProductsHandler);
productRouter.get('/active', getActiveProductsHandler);
productRouter.get('/name', getSearchProductHandler);
productRouter.get('/filter', getFilteredAndPaginatedProductsHandler);
productRouter.get('/:id', getProductDetailHandler);
productRouter.post('/', postProductHandler); 
productRouter.put('/:id', putProductHandler);
productRouter.delete('/:id', deleteProductHandler);
// productRouter.patch('/:productId/toggle-status', toggleProductActiveStatus);

module.exports = productRouter;
