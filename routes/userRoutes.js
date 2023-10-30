const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateJWT } = require("../middlewares/authMiddleware");

router.post("/register", userController.registerUser);
router.post("/users", userController.createUser);
router.get("/users/:id", userController.readUser);
router.get("/users", userController.readAllUserwithSearcPaging);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);
router.post("/login", userController.loginUser);
router.get("/home", authenticateJWT, userController.home);

router.get("/users", userController.readAllUser);

module.exports = router;
