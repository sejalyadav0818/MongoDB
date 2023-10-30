const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

//one To Many Controller
router.get("/car", carController.readAllCarandUsers);
router.post("/car", carController.createAllCarandUsers);

//Mnay to Many Controller



module.exports = router;
