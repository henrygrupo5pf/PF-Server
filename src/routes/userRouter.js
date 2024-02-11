const { Router } = require("express");

const {
    postUserHandler,
    getUserDetailHandler,
    postUserLoginHandler,
    getUserHandler
} = require('../handlers/userHandlers');

const userRouter = Router();

userRouter.post('/', postUserHandler);
userRouter.get('/', getUserHandler); 
userRouter.get('/:id', getUserDetailHandler);
userRouter.post('/login', postUserLoginHandler); 

module.exports = userRouter;