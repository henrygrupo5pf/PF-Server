const {
  createDogsDB,
  getDogsById,
  getAllDogs,
  getDogsByName,
} = require("../controllers/dogsControllers");

const getDogsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const dogsByName = await getDogsByName(name);
      res.status(200).json(dogsByName);
    } else {
      const dogsList = await getAllDogs();
      res.status(200).json(dogsList);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//*********************************************************************************************** */

const getDetailHandler = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? "bdd" : "api";

  try {
    const response = await getDogsById(id, source);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//*********************************************************************************************** */

const createDogsHandler = async (req, res) => {
  const { imagen, name, altura, peso, años_vida } = req.body;
  try {
    const response = await createDogsDB(imagen, name, altura, peso, años_vida);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getDogsHandler, getDetailHandler, createDogsHandler };
