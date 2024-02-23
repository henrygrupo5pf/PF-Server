const postUser = require('../controllers/userControllers/postUser');
const getUserDetail = require('../controllers/userControllers/getUserDetail');
const getUserLogin = require('../controllers/userControllers/getUserLogin');
const getUsers = require("../controllers/userControllers/getUsers");
const putUpdateUser = require("../controllers/userControllers/putUpdateUser");

const getUserHandler = async (req, res) => {
    let { page, pageSize } = req.query;
    try {
        const response = await getUsers(page, pageSize);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postUserHandler = async (req, res) => {
    let { name, email, password, country, location, phoneNumber } = req.body;
    let activeStatus = true;
    let admin = true;
    if (!name || !email || !password || !country || !location || !phoneNumber) {
        res.status(401).json({ error: "Incomplete Data" });
    } else {
        try {
            let response = await postUser({ name, email, password, country, location, phoneNumber, activeStatus, admin });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

const getUserDetailHandler = async (req, res) => {
    let { id } = req.params;
    try {
        const response = await getUserDetail(id);
        if (response.error) {
            res.status(400).json({ error: response.error });
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserLoginHandler = async (req, res) => {
    let { email, password } = req.body;

    try {

        const response = await getUserLogin(email, password);

        if (response.error) {
            res.status(400).json({ error: response.error });
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const putUserHandler = async (req, res) => {
    try {
        let { id } = req.params;
        console.log(req.body);
        let { name, email, password, country, location, phoneNumber, activeStatus, admin } = req.body;
        let info = { name, email, password, country, location, phoneNumber, activeStatus, admin };

        if (!id) {
            return res.status(400).json({ error: "No se puede leer el id" });
        }

        if (!name || !email || !password || !country || !location || !phoneNumber || !activeStatus || !admin) {
        
            return res.status(400).json({ error: "Falta información" });
        }

        let modifiedUser = await putUpdateUser(id, info);
        return res.status(200).json({ user: modifiedUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



module.exports = {
    postUserHandler,
    getUserDetailHandler,
    getUserLoginHandler,
    getUserHandler,
    putUserHandler
}