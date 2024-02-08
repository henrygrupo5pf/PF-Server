const {Product, User}= require("../../db");

const postCreateProduct= async({userId, name, category, cost, description, photo, activeStatus})=>{
    const newProduct= await Product.create({ userId, name, category, cost, description, photo, activeStatus });

    const user = await User.findByPk(userId);
    if (user) {
        await newProduct.setUser(user);
    }

    return newProduct
//PONER LA RELACION N A N CON SHOPPINGCART
};

module.exports=postCreateProduct