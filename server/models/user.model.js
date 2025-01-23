const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: 4 },
    password: { type: String, required: true },
});

const User = model("User", UserSchema);
module.exports = User;
