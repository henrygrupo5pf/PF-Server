const { Router } = require("express");
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const reservationRouter = require('./reservationRouter');
const cartRouter = require('./cartRouter');

const router = Router();

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/reservation', reservationRouter);
router.use('/cart', cartRouter);

module.exports = router;