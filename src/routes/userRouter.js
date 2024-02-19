const { Router } = require("express");

const {
    postUserHandler,
    getUserDetailHandler,
    getUserLoginHandler,
    getUserHandler,
    putUserHandler
} = require('../handlers/userHandlers');

const userRouter = Router();

userRouter.post('/', postUserHandler);
userRouter.get('/', getUserHandler);
userRouter.get('/login', getUserLoginHandler);
userRouter.get('/:id', getUserDetailHandler);
userRouter.put("/:id", putUserHandler)

module.exports = userRouter;