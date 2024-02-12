const { User, Product } = require('../../db');

const getUserLogin = async (email, password) => {

    const dbUser = await User.findOne({
        where: { email: email },
        include: {
            model: Product,
            attributes: ["name", "id", "photo"]
        }
    });

    console.log("ACA ESTA EL DBUSER:       ",dbUser); //ACA ESTA EL PROBLEMA

    if (!dbUser) {
        throw new Error("User not found");
    }

    const passwordMatch = password === dbUser.password;

    console.log("ACA ESTA EL PASSWORD:    ", passwordMatch);

    if (passwordMatch) {
            
        return dbUser;

    } else {

        throw new Error("Incorrect password");
    }

};

module.exports = getUserLogin;