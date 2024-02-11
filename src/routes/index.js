const { Router } = require("express");
const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const useCheckOutRouter = require("./checkOutRouter");

const router = Router();

router.use('/product', productRouter);
router.use('/user', userRouter)
router.use("/checkout", useCheckOutRouter )

module.exports = router;