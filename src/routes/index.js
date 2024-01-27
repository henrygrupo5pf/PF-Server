const { Router } = require("express");
const productRouter = require('./productRouter');

const router = Router();

router.use('/product', productRouter);

module.exports = router;