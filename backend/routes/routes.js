const express = require('express');
const routes = express.Router();
const multer  = require('multer');


const multerMiddlewares = require('../middlewares/multerFunctions');
const CandidatureController = require("../controllers/candidatures");
const UsersController = require("../controllers/users");
const AuthMiddlewares = require("../middlewares/auth");
const InstitutionsController = require("../controllers/institutions");
const FaqsController = require("../controllers/faqs");

/* Candidatures */
routes.get("/candidatures",AuthMiddlewares.verifyToken,CandidatureController.index);
routes.post("/candidatures",CandidatureController.create);
routes.put("/candidatures",AuthMiddlewares.verifyToken,CandidatureController.update);
routes.delete("/candidatures/:id",AuthMiddlewares.verifyToken,CandidatureController.delete);


/* Users */
routes.get("/users",AuthMiddlewares.verifyToken,AuthMiddlewares.verifyRole,UsersController.index);
//routes.post("/registerusers",AuthMiddlewares.verifyToken,AuthMiddlewares.verifyRole, UsersController.resgister);
routes.post("/registerusers",UsersController.resgister);
routes.put("/users",AuthMiddlewares.verifyToken, AuthMiddlewares.verifyRole, UsersController.update);
routes.delete("/users",AuthMiddlewares.verifyToken, AuthMiddlewares.verifyRole,UsersController.delete);

/* Auth */
routes.post("/auth",UsersController.login);


/* Institutions */
routes.get("/institutions",InstitutionsController.index);
routes.post("/institutions",AuthMiddlewares.verifyToken,AuthMiddlewares.verifyRole, multerMiddlewares.uploadVideoFunction, InstitutionsController.create);
routes.put("/institutions",AuthMiddlewares.verifyToken,AuthMiddlewares.verifyRole, InstitutionsController.update);
routes.delete("/institutions/:id",AuthMiddlewares.verifyToken,AuthMiddlewares.verifyRole, InstitutionsController.delete);

/* Faqs */
routes.get("/faqs",FaqsController.index);
routes.post("/faqs",AuthMiddlewares.verifyToken, FaqsController.create);
routes.put("/faqs",AuthMiddlewares.verifyToken, FaqsController.update);
routes.delete("/faqs/:id",AuthMiddlewares.verifyToken, FaqsController.delete);


module.exports = routes;