const {getTemperamentsByName} = require("../controllers/temperamentsControllers")

const getTemperamentsHandler = async(req, res) => {
  const { temperaments } = req.query;
  try {
        const temperamentsList = await getTemperamentsByName(temperaments)
        res.status(200).json(temperamentsList);
    }

   catch (error) {
    res.status(400).json({ error: error.message });
  }
}
module.exports = { getTemperamentsHandler };