const { ShoppingCart, Reservation, Product } = require("../../db");

const modelsCheckOut = async (info) => {
    try {
console.log("SOY modelsCheckOut:  ", "HOLA")
        const id = info.userId.id;
        const dateOfPurchaseDate = new Date()

        const shoppingCart = await ShoppingCart.create({ userId: id, dateOfPurchase: dateOfPurchaseDate });



        await Promise.all(info.cartItems.map(async (item) => {


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

        await Promise.all(info.cartItems.map(async (item) => {
            let initialDate = new Date(item.startDate)
            let finalDate = new Date(item.endDate)

            const reservation = await Reservation.create({
                userId: id,
                productId: item.id,
                startTime: initialDate.toISOString(),
                endTime: finalDate.toISOString(),
            });
        }))



    } catch (error) {
        throw new Error('Hubo un error al procesar el checkout.');
    }
};

module.exports = {
    modelsCheckOut
};
