const { Router } = require("express");
const { 
    getUsersHandler, 
    searchUserHandler, 
    getUserDetailHandler, 
    postUserHandler, 
    updateUserHandler,
    getFilteredUsers
} = require('../handlers/usersHandlers');

const userRouter = Router();

userRouter.get('/', getUsersHandler); //falta

userRouter.get('/name', searchUserHandler); //falta

userRouter.get('/:id', getUserDetailHandler);

userRouter.get('/filter', getFilteredUsers); //falta

userRouter.post('/', postUserHandler); //falta

userRouter.put('/:id', updateUserHandler); //falta

module.exports = userRouter;