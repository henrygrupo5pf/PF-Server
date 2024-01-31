const postUser = require('../controllers/userControllers/postUser');
const getUserDetail = require('../controllers/userControllers/getUserDetail')

const postUserHandler = async (req, res) => {
    let { name, email, password, country, location, phoneNumber } = req.body;
    let activeStatus = true;
    let admin = true;
    if (!name || !email || !password || !country || !location || !phoneNumber) {
        res.status(401).json({error: "Incomplete Data"});
    } else {
        try {
            let response = await postUser({ name, email, password, country, location, phoneNumber, activeStatus, admin });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
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


module.exports = {
    postUserHandler,
    getUserDetailHandler
}