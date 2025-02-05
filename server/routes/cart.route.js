const express = require("express");
const CartControllers = require("../controllers/cart.controller");
const { upload, uploadToFirebase } = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/authJwt.middleware");

const router = express.Router();

router.post("/", CartControllers.createCart);
router.get("/", CartControllers.getAll);
router.get("/:email", CartControllers.clearAllByEmail);
router.put("/:id", CartControllers.update);
router.delete("/:id", CartControllers.delete);
router.delete("/clear/:email", CartControllers.clearAllByEmail);
module.exports = router;
