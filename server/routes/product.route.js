const express = require("express");
const ProductController = require("../controllers/product.controller");
const { upload, uploadToFirebase } = require("../middlewares/file.middleware");
const authJwt = require("../middlewares/authJwt.middleware");

const router = express.Router();

router.post("/", [upload, uploadToFirebase], ProductController.createProduct);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.put("/:id", [upload], ProductController.updateProduct);
router.delete("/:id", [authJwt.verifyToken], ProductController.deleteProduct);

module.exports = router;
