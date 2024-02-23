const { Router } = require("express");

const {
    postUserHandler,
    getUserDetailHandler,
    postUserLoginHandler,
    getUserHandler,
    putUserHandler,
    deleteUserHandler

} = require('../handlers/userHandlers');

const userRouter = Router();

userRouter.post('/', postUserHandler);
userRouter.get('/', getUserHandler); 
userRouter.get('/:id', getUserDetailHandler);
userRouter.post('/login', postUserLoginHandler);
userRouter.put('/:id', putUserHandler);
userRouter.delete('/:id', deleteUserHandler); 

module.exports = userRouter;