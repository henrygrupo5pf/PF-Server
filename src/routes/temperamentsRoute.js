const { Router } = require('express');
//const { Driver, Team } = require('../db.js');
const { getTemperamentsHandler } = require("../handlers/temperamentsHandlers");
const temperamentsRouter = Router();
temperamentsRouter.get("/", getTemperamentsHandler);

module.exports = temperamentsRouter;