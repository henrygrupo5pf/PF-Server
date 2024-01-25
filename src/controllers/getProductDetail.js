const { User, Product } = require('../db');
const {Op}= require("sequelize")

const getProductDetail= async (id)=>{
    const dbId= await Product.findOne({
        where:{
            id:{[Op.like]: `%${id}%`}
        },
        include:{
            model: User,
            attributes: ["name", "id"]
        }
    });
    if (!dbId) {
        throw new Error("Product not found");
    }

    return dbId;
};

module.exports= getProductDetail;