const { Router } = require("express");
const { 
    getUsersHandler, 
    searchUserHandler, 
    getUserDetailHandler, 
    postUserHandler, 
    updateUserHandler,
    getFilteredUsers
} = require('../handlers/usersHandlers');

const productRouter = Router();

userRouter.get('/', getUsersHandler);

userRouter.get('/name', searchUserHandler);

userRouter.get('/:id', getUserDetailHandler);

userRouter.get('/filter', getFilteredUsers);

userRouter.post('/', postUserHandler);

userRouter.put('/:id', updateUserHandler);

module.exports = userRouter;