const { Router } = require("express");
const { 
    getProductsHandler, 
    searchProductHandler, 
    getProductDetailHandler, 
    postProductHandler, 
    updateProductHandler,
    getFilteredProducts
} = require('../handlers/productHandlers');

const productRouter = Router();

productRouter.get('/', getProductsHandler);

productRouter.get('/name', searchProductHandler);

productRouter.get('/:id', getProductDetailHandler);

productRouter.get('/filter', getFilteredProducts);

productRouter.post('/', postProductHandler);

productRouter.put('/:id', updateProductHandler);

module.exports = productRouter;