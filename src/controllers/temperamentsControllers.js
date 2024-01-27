const axios = require("axios");
const {Dogs} = require("../db");

const cleanTemperaments = (arr)=>{
    return arr.map((temperaments)=>{
    return{
        temperamentos:temperaments.temperaments
    };
    });
  };  

const getTemperamentsByName = async()=>{
    const allTemperaments = await Dogs.findAll();
  const infoApi = (await axios.get("https://api.thedogapi.com/v1/breeds/"))
    .data;
    const allTemperamentsApi = cleanTemperaments(infoApi)
    return [...allTemperaments, ...allTemperamentsApi];
}
module.exports = {getTemperamentsByName};