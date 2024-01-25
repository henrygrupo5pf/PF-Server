const { User, Product, Reservation, ShoppingCart } = require('../../db');
const { Op } = require("sequelize");

const getUserDetail = async (id) => {
    const dbUser = await User.findOne({
        where: {
            id: { [Op.eq]: id }
        },
        include: [
            {
                model: Product,
                attributes: ["id", "name"]
            },
            {
                model: Reservation,
                attributes: ["id", "productId", "userId"]
            },
            {
                model: ShoppingCart,
                attributes: ["id", "userId", "dateOfPurchase"]
            }
        ]
    });

    if (!dbUser) {
        throw new Error("User not found");
    }

    return dbUser;
};

module.exports = getUserDetail;
