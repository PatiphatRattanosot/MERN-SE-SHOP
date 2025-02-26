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
    res.status(200).json({ email: user.email, role: user.role, token });
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

exports.addUser = async (req, res) => {
  const { email } = req.body;

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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(200).json({ message: "No User." });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something error occurred while getting users",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, role } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { email, role },
      { new: true }
    );
    if (!updateUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully", updateUser });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something error occurred while updating user",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: "User id is not Provided" });
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something error occurred while deleting user",
    });
  }
};

exports.makeAdmin = async (req, res) => {
  const { email } = req.params;
  if (!email) return res.status(400).json({ message: "Email is required" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    user.role = "admin";
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something error occurred while making admin",
    });
  }
};

exports.makeUser = async (req, res) => {
  const { email } = req.params;
  if (!email) return res.status(400).json({ message: "Email is required" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    user.role = "user";
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something error occurred while making user",
    });
  }
};

exports.getRoleByEmail = async (req, res) => {
  const { email } = req.params;
  if (!email) return res.status(400).json({ message: "Email is required" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ role: user.role });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something error occurred while getting role",
    });
  }
};
