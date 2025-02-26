const express = require("express");
const AuthController = require("../controllers/user.controller");
const { verifyToken, isAdmin } = require("../middlewares/authJwt.middleware");
const router = express.Router();

router.post("/sign", AuthController.sign);
router.post("/add", AuthController.addUser);
router.get("/", AuthController.getAllUsers);
router.put("/:id", verifyToken, isAdmin, AuthController.updateUser);
router.delete("/:id", verifyToken, isAdmin, AuthController.deleteUser);
router.patch("/admin/:email", verifyToken, isAdmin, AuthController.makeAdmin);
router.patch("/user/:email", verifyToken, isAdmin, AuthController.makeUser);
module.exports = router;
