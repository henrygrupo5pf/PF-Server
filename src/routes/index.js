const { Router } = require('express');
const dogs = require("./dogsRoute");
const temperaments = require("./temperamentsRoute");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogs);
router.use("/temperaments", temperaments);

module.exports = router;
