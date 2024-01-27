const getUserDetail= require("../controllers/userControllers/getUserDetail");
const getUsers = require("../controllers/userControllers/getUsers");

const getUsersHandler = async (req, res) => {
    try {
        const response = await getUsers();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.nessage});
    }
};

const searchUserHandler = async (req, res) => { };

const getUserDetailHandler = async (req, res) => {
    let { id } = req.params;
    try {
        const response = await getUserDetail(id);
        if (response.error) {
            res.status(400).json({error: response.error});
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getFilteredUsers = async (req, res) => { };

const postUserHandler = async (req, res) => { };

const updateUserHandler = async (req, res) => { };

module.exports={
    getUsersHandler,
    searchUserHandler,
    getUserDetailHandler,
    getFilteredUsers,
    postUserHandler,
    updateUserHandler
};
