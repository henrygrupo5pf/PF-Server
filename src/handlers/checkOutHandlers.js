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
    
    try {
        const response = await checkOut(checkOutInfo);
        const modelResponse = await modelsCheckOut(checkOutModels);

        if (response.error) {
            res.status(400).json({ error: response.error });
        } /* if (modelResponse.error) {
            res.status(400).json({ error: modelResponse.error }); DESCOMENTAR CUANDO SE ESTE APUNTANDO A LA BD EN DEPLOY
        } */ else {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//ACTUALMENTE DA ERROR PORQUE CUANDO SE CREA EL CARRITO NO PUEDE CREARLO CON UN ID DE USUARIO INEXISTENTE EN LA DB LOCAL. CALCULO QUE CUANDO
//CAMBIE A DONDE APUNTA Y APUNTE A LA DB EN DEPLOY SE VA A SOLUCIONAR SOLO



module.exports = {
    postCheckOutHandler,
}