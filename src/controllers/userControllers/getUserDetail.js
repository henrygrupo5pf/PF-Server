const { User, Product } = require('../../db');

const getUserDetail = async (id) => {
    console.log(id);
    const dbUser = await User.findByPk(id, {
        include: {
            model: Product,
            attributes: ["name", "id"]
        }
    });
    if (!dbUser) {
        throw new Error("User not found");
    }

    return dbUser;
};

module.exports = getUserDetail;