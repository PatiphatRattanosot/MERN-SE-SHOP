const express = require("express");
const AuthController = require("../controllers/user.controller");

const router = express.Router();

router.post("/sign", AuthController.sign);
router.post("/add", AuthController.addUser);

module.exports = router;
