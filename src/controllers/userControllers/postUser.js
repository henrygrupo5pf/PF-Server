const { User } = require('../../db');

const postUser = async({name, email, password, country, location, phoneNumber, activeStatus, admin})=>{
    const newUser = await User.create({ name, email, password, country, location, phoneNumber, activeStatus, admin });

    return newUser;

};

module.exports = postUser;