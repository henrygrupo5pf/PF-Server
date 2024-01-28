const { Router } = require("express");
const { 
    getProductsHandler,
    getsearchProductHandler,
    getProductDetailHandler,
    getFilteredAndPaginatedProductsHandler,
    postProductHandler,
    putProductHandler,
} = require('../handlers/productHandlers');

const productRouter = Router();

productRouter.get('/', getProductsHandler);
productRouter.get('/name', getsearchProductHandler);
productRouter.get('/filter', getFilteredAndPaginatedProductsHandler);
productRouter.get('/:id', getProductDetailHandler);
productRouter.post('/', postProductHandler); 
productRouter.put('/:id', putProductHandler);

module.exports = productRouter;