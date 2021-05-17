const express = require('express');
const routes = express.Router();
const multer  = require('multer');



/*var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/videos')
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + '-' + Date.now() + '.mp4')
    },
    
  })


var upload = multer({
    storage: storage, 
    fileFilter: (req, file, cb) => {
    if (file.mimetype == "video/mp4") {
        console.log("nice");
      cb(null, true);
    } else {
        console.log("error");
      cb(null, false);
      return res.status(500).json({'ok':false, 'errorMessage':'Only .png, .jpg and .jpeg format allowed!'});
    }
  } }); */

const multerMiddlewares = require('../middlewares/multerFunctions');
const CandidatureController = require("../controllers/candidatures");
const UsersController = require("../controllers/users");
const AuthMiddlewares = require("../middlewares/auth");
const InstitutionsController = require("../controllers/institutions");

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


module.exports = routes;