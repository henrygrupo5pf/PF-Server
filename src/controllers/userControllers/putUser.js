const { User } = require('../../db');

const putUser = async ({id, name, email, password,  country, location, phoneNumber, admin, activeStatus }) => {
    let updateFields = {};
    if (email) {
        updateFields.email = email;
    }
    if (activeStatus) {
        updateFields.activeStatus = activeStatus;
    }

    if(name){
        updateFields.name = name;
    }

    if(password){
        updateFields.password = password;
    }

    if(country){
        updateFields.country = country;
    }

    if(location){
        updateFields.location = location;
    }

    if(phoneNumber){
        updateFields.phoneNumber = phoneNumber;
    }

    if(admin){
        updateFields.admin = admin;
    }

    if (Object.keys(updateFields).length === 0) {
        return {error: 'No valid fields to update.'};
    }
    

    const [updatedRowsCount] = await User.update(updateFields, {
        where: { id: id },
    });

    if (updatedRowsCount > 0) {
        return {message: 'User updated successfully.'};
    } else {
        return {error: 'User not found.'};
    }
};

module.exports = putUser;
