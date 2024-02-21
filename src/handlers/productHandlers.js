const getProducts=require("../controllers/productControllers/getProducts");
const getSearchProduct=require("../controllers/productControllers/getSearchProduct");
const getProductDetail=require("../controllers/productControllers/getProductDetail");
const postCreateProduct=require("../controllers/productControllers/postCreateProduct");
const getFilteredAndPaginatedProducts=require("../controllers/productControllers/getFilteredAndPaginatedProducts");
const putProduct = require('../controllers/productControllers/putProduct');

const getProductsHandler= async(req, res)=>{
    let { page, pageSize } = req.query;
    try {
        const response = await getProducts(page, pageSize);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getSearchProductHandler = async (req, res) => {
    let { name, page, pageSize } = req.query;
    try {
        if (!name) {
            const response = await getProducts(page, pageSize);
            res.status(200).json(response);
        } else {
            const response = await getSearchProduct(name, page, pageSize);
            if (response.error) {
                res.status(400).json({ error: response.error });
            } else {
                res.status(200).json(response);
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductDetailHandler = async (req, res) => {
    let { id } = req.params;
    try {
        const response = await getProductDetail(id);
        if (response.error) {
            res.status(400).json({error: response.error});
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const postProductHandler = async (req, res) => {
    let { userId, name, category, cost, description, photo } = req.body;
    let activeStatus = true;
    if (!userId || !name || !category || !cost || !description || !photo) {
        res.status(401).json({error: "Incomplete Data"});
    } else if (typeof cost != 'number' || cost < 0) {
        res.status(401).json({error: "cost is not a number or is lower than 0"});
    } else {
        try {
            let response = await postCreateProduct({ userId, name, category, cost, description, photo, activeStatus });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
};

const getFilteredAndPaginatedProductsHandler = async (req, res) => {
    let { page, pageSize, category, costRange, country, location, name } = req.query;
    const [minCost, maxCost] = costRange ? costRange.split('-').map(Number) : [null, null];

    try {
        const response = await getFilteredAndPaginatedProducts(page, pageSize, category, minCost, maxCost, country, location, name);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// const putProductHandler = async (req, res) => {
//     let { cost, activeStatus, name, photo, description, category } = req.body;
//     let { id } = req.params;
//     if (cost && cost < 0) {
//         res.status(401).json({error: "El costo debe ser mayor a 0."})
//     } else {
//         try {
//             let response = await putProduct({ id, cost, activeStatus, name, photo, description, category });
//             if (response.error) {
//                 res.status(400).json(response);
//             } else {
//                 res.status(200).json(response);
//             }
//         } catch (error) {
//             res.status(500).json({error: error.message});
//         }
//     }
// }


const putProductHandler = async (req, res) => {
    const { id } = req.params;
    const { cost, activeStatus, name, photo, description, category } = req.body;

    // Validación básica para el costo
    // if (cost !== undefined && (typeof cost != 'number' || cost < 0)) {
    //     return res.status(401).json({error: "El costo debe ser un número mayor o igual a 0."});
    // }

    try {
        // Asume que putProduct actualiza solo los campos proporcionados y devuelve el producto actualizado
        const updatedProduct = await putProduct(id, { cost, activeStatus, name, photo, description, category });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error); // Para depuración
        res.status(500).json({error: error.message});//xx
    }
};

   

module.exports={
    getProductsHandler,
    getSearchProductHandler,
    getProductDetailHandler,
    postProductHandler,
    getFilteredAndPaginatedProductsHandler,
    putProductHandler,
};
