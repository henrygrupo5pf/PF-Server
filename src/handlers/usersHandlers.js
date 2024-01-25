const getUserDetail= require("../controllers/userControllers/getUserDetail");

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
    getUserDetailHandler,
};