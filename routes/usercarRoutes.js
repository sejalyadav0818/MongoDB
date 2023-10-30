const express = require("express");
const router = express.Router();
const userCarController = require("../controllers/userCarsController");

//Mnay to Many Controller
router.get("/user", userCarController.readcartoUsers);
router.get("/car", userCarController.readuserToCars);



module.exports = router;
