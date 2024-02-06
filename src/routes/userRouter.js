const { Router } = require("express");

const {
    postUserHandler,
    getUserDetailHandler,
    postUserLoginHandler
} = require('../handlers/userHandlers');

const userRouter = Router();

userRouter.post('/', postUserHandler); 
userRouter.get('/:id', getUserDetailHandler);
userRouter.post('/login', postUserLoginHandler); 

module.exports = userRouter;