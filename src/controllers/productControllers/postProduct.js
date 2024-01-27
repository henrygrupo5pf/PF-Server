const {Product, User}= require("../../db");

const createProduct= async({userId, name, type, category, cost, description, photo, activeStatus})=>{
    const newProduct= await Product.create({ userId, name, type, category, cost, description, photo, activeStatus });

    const user = await User.findByPk(userId);
    if (user) {
        await newProduct.setUser(user);
    }

    return newProduct

};

module.exports=createProduct