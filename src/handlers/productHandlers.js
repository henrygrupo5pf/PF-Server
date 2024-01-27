const getProducts=require("../controllers/productControllers/getProducts");
const getSearchProduct=require("../controllers/productControllers/getSearchProduct");
const getProductDetail=require("../controllers/productControllers/getProductDetail");
const getfilterProducts=require("../controllers/productControllers/getfilterProducts");
const postCreateProduct=require("../controllers/productControllers/postCreateProduct");


const getProductsHandler= async(req, res)=>{
    try {
        const response = await getProducts();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getsearchProductHandler = async (req, res) => {
    let { name } = req.query;
    try {
        if (!name) {
            const response = await getProducts();
            res.status(200).json(response);
        } else {
            const response = await getSearchProduct(name);
            if (response.error) {
                res.status(400).json({error: response.error});
            } else {
                res.status(200).json(response);
            }
        }
    } catch (error) {
        res.status(500).json({error: error.message});
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

const getFilteredProductsHandler = async (req, res) => {
    let { category, costRange } = req.query;
    const [minCost, maxCost] = costRange ? costRange.split('-').map(Number) : [null, null];
    //I'm assuming a selector in the front-end with options like 1-100, 101-200 to filter by price.
    try {
        const response = await getfilterProducts(category, minCost, maxCost);
        res.status(200).json(response);
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
        res.status(401).json({error: "Incomplete Data"});
    } else {
        try {
            let response = await postCreateProduct({ userId, name, category, cost, description, photo, activeStatus });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
};



module.exports={
    getProductsHandler,
    getsearchProductHandler,
    getProductDetailHandler,
    getFilteredProductsHandler,
    postProductHandler,
};