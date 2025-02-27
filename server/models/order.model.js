const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    customerEmail: { type: String, required: true },
    description: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    totalprice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const OrderModel = model("Order", OrderSchema);
module.exports = OrderModel;
