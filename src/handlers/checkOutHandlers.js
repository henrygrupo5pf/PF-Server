const { checkOut } = require("../controllers/checkOutControllers/postCheckOut");

const postCheckOutHandler = async (req, res) => {
    const checkOutInfo = req.body.cartItems;

    if (!Array.isArray(checkOutInfo)) {
        res.status(400).json({ error: "La propiedad 'cartItems' no es un array." });
        return;
    }

    try {
        const response = await checkOut(checkOutInfo);
        if (response.error) {
            res.status(400).json({ error: response.error });
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = {
    postCheckOutHandler,


}