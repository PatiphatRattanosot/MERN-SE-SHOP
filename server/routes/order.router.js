const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller")
router.get("/", OrderController.getAll);
router.get("/:id", OrderController.getById);
router.get("/email/:email", OrderController.getByEmail)
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;