const { Router } = require("express");
//const { Driver, Team } = require('../db.js');
const dogsRouter = Router();
const {
  getDogsHandler,
  getDetailHandler,
  createDogsHandler,
} = require("../handlers/dogsHandlers");

dogsRouter.get("/", getDogsHandler);

dogsRouter.get("/:id", getDetailHandler);

dogsRouter.post("/", createDogsHandler)

module.exports = dogsRouter;