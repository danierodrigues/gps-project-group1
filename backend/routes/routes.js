const express = require('express');
const routes = express.Router();

const CandidatureController = require("../controllers/candidatures");

/* Candidatures */
routes.get("/candidatures",CandidatureController.index);
routes.post("/candidatures",CandidatureController.create);
routes.put("/candidatures",CandidatureController.update);
routes.delete("/candidatures/:id",CandidatureController.delete);

module.exports = routes;