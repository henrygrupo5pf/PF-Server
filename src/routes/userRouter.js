const { Router } = require("express");

const {
    postUserHandler,
    getUserDetailHandler
} = require('../handlers/userHandlers');

const userRouter = Router();

userRouter.post('/', postUserHandler); 
userRouter.get('/:id', getUserDetailHandler); 

module.exports = userRouter;