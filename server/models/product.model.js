const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {},
  {
    timestamps: true,
  }
);

const Product = model("Product", ProductSchema);
module.exports = Post;
