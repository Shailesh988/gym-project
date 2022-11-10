const express = require("express");
const {
  loginUser,
  signupUser,
  getData,
  singleData,
  deleteData,
  updateData,
} = require("../controllers/userController");

const Router = express.Router();

Router.get("/", getData);

Router.get("/:id", singleData);

Router.delete("/:id", deleteData);

Router.patch("/:id", updateData);

// Login user

Router.post("/login", loginUser);

// Sing  up user

Router.post("/signup", signupUser);

module.exports = Router;
