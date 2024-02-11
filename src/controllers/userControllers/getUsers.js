const {User} = require('../../db.js');

const getUsers = async (page = 1, pageSize = 20) => {
    try {
        const { count, rows: Users } = await User.findAndCountAll({
            offset: (page - 1) * pageSize,
            limit: pageSize,
        });

        const totalPages = Math.ceil(count / pageSize);

        return {
            Users,
            totalPages,
        };
    } catch (error) {
        throw error;
    }
}

module.exports = getUsers;