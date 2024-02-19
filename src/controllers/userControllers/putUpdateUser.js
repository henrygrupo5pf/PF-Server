const { User } = require("../../db");

const putUpdateUser = async (id, { name, email, password, country, location, phoneNumber, activeStatus, admin }) => {

    await User.update({ name, email, password, country, location, phoneNumber, activeStatus, admin }, {
        where: { id: id }
    });

    return "Usuario actualizado"

};

module.exports = putUpdateUser;