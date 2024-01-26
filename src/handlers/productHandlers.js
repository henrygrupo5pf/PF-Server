const getProductDetail = require("../controllers/productControllers/getProductDetail");
const getProducts = require("../controllers/productControllers/getProducts");
const filterProducts = require('../controllers/productControllers/getFilteredProducts');


const getProductsHandler = async (req, res) => {
    try {
        const response = await getProducts();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.nessage});
    }
};

const searchProductHandler = async (req, res) => {
    let { name } = req.query;
    try {
        if (!name) {
            const response = await getProducts();
            res.status(200).json(response);
        } else {
            const response = await searchProduct(name);
            if (response.error) {
                res.status(400).json({error: response.error});
            } else {
                res.status(200).json(response);
            }
        }
    } catch (error) {
        res.status(500).json({error: error.nessage});
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

const getFilteredProducts = async (req, res) => {
    let { category, costRange } = req.query;
    const [minCost, maxCost] = costRange ? costRange.split('-').map(Number) : [null, null];
    //I'm assuming a selector in the front-end with options like 1-100, 101-200 to filter by price.
    try {
        const response = await filterProducts(category, minCost, maxCost);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.nessage});
    }
};

const postProductHandler = async (req, res) => {
    let { userId, name, type, category, cost, description, photo } = req.body;
    let activeStatus = true;
    if (!userId || !name || !type || !category || !cost || !description || !photo) {
        res.status(401).json({error: "Incomplete Data"});
    } else if (typeof cost != 'number' || number >= 0) {
        res.status(401).json({error: "Incomplete Data"});
    } else {
        try {
            let response = await createProduct({ userId, name, type, category, cost, description, photo, activeStatus });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: error.nessage});
        }
    }
};

const updateProductHandler = async (req, res) => {
    let { cost } = req.body;
    if ( !cost || cost <= 0 ) {
        res.status(401).json({error: "Incomplete Data"});
    } else {
        try {
            const response = await updateProduct(cost);
            if (response.error) {
                res.status(400).json({error: response.error});
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
};

module.exports = {
    getProductsHandler,
    searchProductHandler,
    getProductDetailHandler,
    postProductHandler,
    updateProductHandler,
    getFilteredProducts,
};