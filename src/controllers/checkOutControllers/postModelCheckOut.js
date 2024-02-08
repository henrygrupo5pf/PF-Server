const { ShoppingCart, Reservation, Product } = require("../../db");

const modelsCheckOut = async (info) => {
    try {

        const id = info.userId.id;
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const shoppingCart = await ShoppingCart.create({ userId: id, dateOfPurchase: formattedDate });

        await Promise.all(info.cartItems.map(async(item) => {
            const product = await Product.findByPk(item.id);

            if (!product) {
                throw new Error(`Hubo un problema con un ID de un producto.`);
            }

            await shoppingCart.addProduct(product, {
                through: {
                    quantity: item.quantity,
                    price: item.cost,
                }
            });
        }));

        await Promise.all(info.cartItems.map(async(item) => {
            const reservation = await Reservation.create({
                userId: id,
                productId: "asd",
                startTime: formattedDate,
                endTime:"asd", 
            });
        }))



    } catch (error) {
        console.error(`Error en modelCheckOut: ${error.message}`);
        throw new Error('Hubo un error al procesar el checkout.');
    }
};

module.exports = {
    modelsCheckOut
};
