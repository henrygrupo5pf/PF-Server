const postUser = require('../controllers/userControllers/postUser');

const postUserHandler = async (req, res) => {
    let { name, email, password, country, location, phoneNumber } = req.body;
    let activeStatus = true;
    let admin = true;
    if (!name || !email || !password || !country || !location || !phoneNumber) {
        res.status(401).json({error: "Datos incompletos"});
    } else {
        try {
            let response = await postUser({ name, email, password, country, location, phoneNumber, activeStatus, admin });
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
};

module.exports = postUserHandler;