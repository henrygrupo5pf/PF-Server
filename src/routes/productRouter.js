const { Router } = require("express");
const { 
    getProductsHandler, 
    searchProductHandler, 
    getProductDetailHandler, 
    postProductHandler, 
    updateProductHandler 
} = require('../handlers/productHandlers');

const productRouter = Router();

productRouter.get('/', getProductsHandler);

productRouter.get('/name', searchProductHandler);

productRouter.get('/:id', getProductDetailHandler);

productRouter.post('/', postProductHandler);

productRouter.put('/:id', updateProductHandler);

module.exports = productRouter;