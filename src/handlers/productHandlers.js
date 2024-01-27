const {
  getProducts,
  searchProduct,
  getProductDetail,
  createProduct,
  updateProduct,
  filterProducts,
} = require("../controllers/productControllers");

const getProductsHandler = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (page - 1) * pageSize;

    const response = await getProducts(parseInt(pageSize), parseInt(offset));
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getShoppingCartHandler = async (limit, offset) => {
  return await ShoppingCart.findAll({
    limit: limit,
    offset: offset,
  });
};


const addToShoppingCartHandler = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const existingCartItem = await ShoppingCart.findOne({
      where: { userId, productId },
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      await ShoppingCart.create({ userId, productId, quantity });
    }

    res
      .status(200)
      .json({ message: "Producto agregado al carrito correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al agregar el producto al carrito" });
  }
};

// Eliminar producto del carrito de compras
const removeProductFromCartHandler = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    await ShoppingCart.destroy({
      where: { userId, productId },
    });

    res
      .status(200)
      .json({ message: "Producto eliminado del carrito correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al eliminar el producto del carrito" });
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
        res.status(400).json({ error: response.error });
      } else {
        res.status(200).json(response);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.nessage });
  }
};

const getProductDetailHandler = async (req, res) => {
  let { id } = req.params;
  try {
    const response = await getProductDetail(id);
    if (response.error) {
      res.status(400).json({ error: response.error });
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFilteredProducts = async (req, res) => {
  let { category } = req.query;
  try {
    const response = await filterProducts(category);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.nessage });
  }
};

const postProductHandler = async (req, res) => {
  let { userId, name, type, category, cost, description, photo } = req.body;
  let activeStatus = true;
  if (
    !userId ||
    !name ||
    !type ||
    !category ||
    !cost ||
    !description ||
    !photo
  ) {
    res.status(401).json({ error: "Incomplete Data" });
  } else if (typeof cost != "number" || number >= 0) {
    res.status(401).json({ error: "Incomplete Data" });
  } else {
    try {
      let response = await createProduct({
        userId,
        name,
        type,
        category,
        cost,
        description,
        photo,
        activeStatus,
      });
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.nessage });
    }
  }
};

const updateProductHandler = async (req, res) => {
  let { cost } = req.body;
  if (!cost || cost <= 0) {
    res.status(401).json({ error: "Incomplete Data" });
  } else {
    try {
      const response = await updateProduct(cost);
      if (response.error) {
        res.status(400).json({ error: response.error });
      } else {
        res.status(200).json(response);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
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
