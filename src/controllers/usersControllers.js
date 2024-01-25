const axios = require("axios");
const { User } = require("../db");
const { Op } = require("sequelize");

const getUsersById = async (id, source) => {
    const users =
      source === "api"
        ? (await axios.get(`http://localhost:3001/user/${id}`)).data
        : await User.findByPk(id);
    return users;
  };