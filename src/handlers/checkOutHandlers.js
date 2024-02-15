const { checkOut } = require("../controllers/checkOutControllers/postCheckOut");
const { modelsCheckOut } = require("../controllers/checkOutControllers/postModelCheckOut");

const postCheckOutHandler = async (req, res) => {
    const checkOutInfo = req.body.cartItems;
    const checkOutModels = req.body

    if (!Array.isArray(checkOutInfo)) {
        res.status(400).json({ error: "La propiedad 'cartItems' no es un array." });
    }
    if (!checkOutModels.userId) {
        res.status(400).json({ error: "La propiedad 'userId' no existe o es erronea." });
    }
console.log("checkOutModels:  ", checkOutModels)
    try {
        console.log("RESPONSE:  ", "hola")
        const response = await checkOut(checkOutInfo);
        console.log("RESPONSE:  ", response)
      /*   const modelResponse = await modelsCheckOut(checkOutModels);
        console.log("MODELRESPONSE:  ", modelResponse) */

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
