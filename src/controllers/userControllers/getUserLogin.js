const bcrypt = require('bcrypt');
const { User, Product } = require('../../db');

const postUserLogin = async (email, password) => {

    const dbUser = await User.findOne({
        where: { email: email },
        include: {
            model: Product,
            attributes: ["name", "id", "photo"]
        }
    });
    if (!dbUser) {
        throw new Error("User not found");
    }

    const passwordMatch = password === dbUser.password;

    if (passwordMatch) {
            
        return dbUser;

    } else {

        throw new Error("Incorrect password");
    }

};

module.exports = postUserLogin;