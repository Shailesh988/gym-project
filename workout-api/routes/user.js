const express = require("express");
const { loginUser, signupUser,getUser } = require("../controllers/userController");

const Router = express.Router();

// Login user

Router.post("/login", loginUser);

// Sing  up user

Router.post("/signup", signupUser);


module.exports = Router;
