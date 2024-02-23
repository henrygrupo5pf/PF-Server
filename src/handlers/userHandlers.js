// const postUser = require('../controllers/userControllers/postUser');
const deleteUser = require('../controllers/userControllers/deleteUser');
const getUserDetail = require('../controllers/userControllers/getUserDetail');
const getUserLogin = require('../controllers/userControllers/getUserLogin');
const getUsers= require("../controllers/userControllers/getUsers");
const postUser = require("../controllers/userControllers/postUser")
const putUser = require("../controllers/userControllers/putUser")

const getUserHandler=async(req, res)=>{
    let { page, pageSize } = req.query;
    try {
        const response = await getUsers(page, pageSize);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getUserDetailHandler = async(req, res) => {
    let {id} = req.params;
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
}

const postUserLoginHandler = async (req, res) => {

    let {email, password} = req.body;
    try {
        const response = await getUserLogin(email, password);
        if (response.error) {
            res.status(400).json({error: response.error});
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const postUserHandler = async(req, res) => {
    let activeStatus = true;
    let {name, email, password, country, location, phoneNumber, admin} = req.body;
    if (!admin) {
        admin = false
    }
    try {
        const response = await postUser({ name, email, password, country, location, phoneNumber, activeStatus, admin });
        if (response.error) {
            res.status(400).json({error: response.error});
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const putUserHandler = async (req, res) => {
    const { id } = req.params;
    const { name, email, password,  country, location, phoneNumber, admin, activeStatus } = req.body;

    try {
        const updatedUser = await putUser({id, name, email, password,  country, location, phoneNumber, admin, activeStatus });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error); // Para depuración
        res.status(500).json({error: error.message});//xx
    }
};

const deleteUserHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUser(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error(error); // Para depuración
        res.status(500).json({error: error.message});//xx
    }
}


module.exports = {
    postUserHandler,
    getUserDetailHandler,
    postUserLoginHandler,
    getUserHandler,
    putUserHandler,
    deleteUserHandler
}