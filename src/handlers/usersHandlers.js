const{
    getUsersById,
} = require("../controllers/usersControllers");

const getUsersHandler = async (req, res) => {
    const { name } = req.query;
    try {
      if (name) {
        const usersByName = await getUsersByName(name);
        res.status(200).json(usersByName);
      } else {
        const usersList = await getAllUsers();
        res.status(200).json(usersList);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };