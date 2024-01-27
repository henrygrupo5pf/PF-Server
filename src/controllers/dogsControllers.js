const axios = require("axios");
const { Dogs } = require("../db");
const createDogsDB = async (image, name, altura, peso, años_vida) => {
  const newDogs = await Dogs.create({
    image,
    name,
    altura,
    peso,
    años_vida,
  });
  return newDogs;
};

const getDogsById = async (id, source) => {
  const dogs =
    source === "api"
      ? (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)).data
      : await Dogs.findByPk(id);
  return dogs;
};

const cleanDogs = (arr) => {
  return arr.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      años_vida:dog.life_span,
      temperamento: dog.temperament,
      image: dog.reference_image_id,
      created: false,
    };
  });
};

const getAllDogs = async () => {
  const allDogs = await Dogs.findAll();
  const infoApi = (await axios.get("https://api.thedogapi.com/v1/breeds/")).data;
  const allDogsApi = cleanDogs(infoApi);

  return [...allDogs, ...allDogsApi];
};

const getDogsByName = async (name) => {
  const infoApi = (await axios.get("https://api.thedogapi.com/v1/breeds/")).data;
  const allDogssApi = cleanDogs(infoApi);
  const dogssFilter = allDogssApi.filter(dogs => dogs.name === name);
  const dogsDb = await Dogs.findAll({ where: { name:name } });

  return [...dogssFilter, ...dogsDb];
};

module.exports = { createDogsDB, getDogsById, getAllDogs, getDogsByName };
