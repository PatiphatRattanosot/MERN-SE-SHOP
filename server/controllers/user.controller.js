const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.sign = async (req, res) => {
  const email = req.body.email;
  if (!email) return res.status(400).json({ message: "Email is required" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

exports.addUser = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  if (!email) return res.status(400).json({ message: "Email is required" });
  try {
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(409).json({ message: "User already exist" });
    const newUser = await User.create({ email });
    if (!newUser)
      return res.status(404).json({ message: "cannot create user" });
    res.status(200).json({ message: "Created User.", newUser });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something error occurred adding a new user",
    });
  }
};
