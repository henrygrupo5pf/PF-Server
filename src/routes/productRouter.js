const { Router } = require("express");
const { 
    getProductsHandler,
    getSearchProductHandler,
    getProductDetailHandler,
    getFilteredAndPaginatedProductsHandler,
    postProductHandler,
    putProductHandler,
} = require('../handlers/productHandlers');

const productRouter = Router();

productRouter.get('/', getProductsHandler);
productRouter.get('/name', getSearchProductHandler);
productRouter.get('/filter', getFilteredAndPaginatedProductsHandler);
productRouter.get('/:id', getProductDetailHandler);
productRouter.post('/', postProductHandler); 
productRouter.put('/:id', putProductHandler);

module.exports = productRouter;