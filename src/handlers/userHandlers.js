const postUser = require('../controllers/userControllers/postUser');
const getUserDetail = require('../controllers/userControllers/getUserDetail')
const postUserLogin = require('../controllers/userControllers/getUserLogin')

const postUserHandler = async (req, res) => {
    let { name, email, password, country, location, phoneNumber } = req.body;
    let activeStatus = true;
    let admin = true;
    if (!name || !email || !password || !country || !location || !phoneNumber) {
        res.status(401).json({error: "Datos incompletos"});
    } else {
        try {
            console.log('Creando usuario:', { name, email, password, country, location, phoneNumber, activeStatus, admin });
            let response = await postUser({ name, email, password, country, location, phoneNumber, activeStatus, admin });
            console.log('Usuario creado:', response);
            res.status(200).json(response);
        } catch (error) {
            console.error('Error al crear usuario:', error);
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

const postUserLoginHandler = async (req, res) => {
    let {email, password} = req.body;
    try {
        const response = await postUserLogin(email, password);
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
    getUserDetailHandler,
    postUserLoginHandler
}