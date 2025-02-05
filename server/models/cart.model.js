const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CartSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    email: { type: String, required: true },
    quantity: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", CartSchema);
module.exports = Cart;
