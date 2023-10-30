const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

//one To Many Controller
router.get("/post", postController.readAllPostWithUsers);
router.post("/post", postController.createPostWithUsers);

//Mnay to Many Controller



module.exports = router;
