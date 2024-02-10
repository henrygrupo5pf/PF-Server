const { Router } = require("express");
const { postCheckOutHandler} = require("../handlers/checkOutHandlers")



const checkOutRouter = Router();

checkOutRouter.post('/', postCheckOutHandler);


module.exports = checkOutRouter;