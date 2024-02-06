const { Router } = require("express");
const { postCheckOutHandler, getChekOutSuccess, getChekOutCancel } = require("../handlers/checkOutHandlers")



const checkOutRouter = Router();

checkOutRouter.post('/', postCheckOutHandler);
checkOutRouter.get('/success', getChekOutSuccess);
checkOutRouter.get('/cancel', getChekOutCancel);


module.exports = checkOutRouter;