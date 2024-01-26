const { Router } = require("express");
const {
  getShoppingCartHandler,
  addToShoppingCartHandler,
  removeProductFromCartHandler,
} = require("../handlers/productHandlers");

const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
  try {
    const { page = 1, pageSize = 5 } = req.query;
    const offset = (page - 1) * pageSize;

    const shoppingCart = await getShoppingCartHandler(
      parseInt(pageSize),
      parseInt(offset)
    );

    res.json(shoppingCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Agregar producto al carrito de compras
cartRouter.post("/cart", addToShoppingCartHandler);

// Eliminar producto del carrito de compras
cartRouter.delete("/cart/:userId/:productId", removeProductFromCartHandler);

module.exports = cartRouter;
