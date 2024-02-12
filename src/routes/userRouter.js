const { Router } = require("express");

const {
    postUserHandler,
    getUserDetailHandler,
    getUserLoginHandler,
    getUserHandler
} = require('../handlers/userHandlers');

const userRouter = Router();

userRouter.post('/', postUserHandler);
userRouter.get('/', getUserHandler);
userRouter.get('/login', getUserLoginHandler);
userRouter.get('/:id', getUserDetailHandler);

module.exports = userRouter;