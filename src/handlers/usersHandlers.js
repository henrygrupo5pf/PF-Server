const getUserDetail= require("../controllers/userControllers/getUserDetail");
const getUsers = require("../controllers/userControllers/getUsers")
const getUsersHandler = async (req, res) => {
    try {
        const response = await getUsers();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.nessage});
    }
};

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

module.exports={
    getUserDetailHandler,getUsersHandler
};