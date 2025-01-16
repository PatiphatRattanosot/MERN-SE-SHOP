require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL || 3000;

const cors = require("cors");
const corsOption = {
  origin: FRONTEND_URL,
};

app.use(cors(corsOption));
app.use(express.json());

const databaseURL = process.env.DATABASE_URL;
mongoose
  .connect(databaseURL)
  .then(() => console.log("Connected td mongodb"))
  .catch((err) => console.log("Database connection error : " + err));
