const { Router } = require("express");
const { 
    getProductsHandler,
    getsearchProductHandler,
    getProductDetailHandler,
    getFilteredProductsHandler,
    postProductHandler,
    putProductHandler,
} = require('../handlers/productHandlers');

const productRouter = Router();

productRouter.get('/', getProductsHandler);
productRouter.get('/name', getsearchProductHandler);
productRouter.get('/filter', getFilteredProductsHandler);
productRouter.get('/:id', getProductDetailHandler);
productRouter.post('/', postProductHandler); 
productRouter.put('/:id', putProductHandler);

module.exports = productRouter;