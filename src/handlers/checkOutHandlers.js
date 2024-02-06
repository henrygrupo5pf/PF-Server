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

const getChekOutSuccess = async (req, res) => {

    //aca te tiene que enviar a otra url que a su vez te redireccione a home
    //del front
    //tiene que tener un contador y cuando se cumpla que redireccione
    res.send("Success")
};
const getChekOutCancel = async (req, res) => {
      //aca lo mismo que arriba
    res.send("Cancel")
};





module.exports = {
    postCheckOutHandler,
    getChekOutSuccess,
    getChekOutCancel

}