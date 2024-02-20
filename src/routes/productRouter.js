// const { Router } = require("express");
// const { 
//     getProductsHandler,
//     getSearchProductHandler,
//     getProductDetailHandler,
//     getFilteredAndPaginatedProductsHandler,
//     postProductHandler,
//     putProductHandler,
//     toggleProductActiveStatus,
// } = require('../handlers/productHandlers');

// const productRouter = Router();

// productRouter.get('/', getProductsHandler);
// productRouter.get('/name', getSearchProductHandler);
// productRouter.get('/filter', getFilteredAndPaginatedProductsHandler);
// productRouter.get('/:id', getProductDetailHandler);
// productRouter.post('/', postProductHandler); 
// productRouter.put('/:id', putProductHandler);
// productRouter.patch('/:productId/toggle-status', toggleProductActiveStatus); // Usa 'patch' y ajusta la ruta

// module.exports = productRouter;


const { Router } = require("express");
const { 
    getProductsHandler,
    getSearchProductHandler,
    getProductDetailHandler,
    getFilteredAndPaginatedProductsHandler,
    postProductHandler,
    putProductHandler,
    // No importes toggleProductActiveStatus desde aquí si no está en este archivo
} = require('../handlers/productHandlers');

const  toggleProductActiveStatus  = require('../controllers/productControllers/toggleProductStatus');

const productRouter = Router();

productRouter.get('/', getProductsHandler);
productRouter.get('/name', getSearchProductHandler);
productRouter.get('/filter', getFilteredAndPaginatedProductsHandler);
productRouter.get('/:id', getProductDetailHandler);
productRouter.post('/', postProductHandler); 
productRouter.put('/:id', putProductHandler);
productRouter.patch('/:productId/toggle-status', toggleProductActiveStatus);

module.exports = productRouter;
