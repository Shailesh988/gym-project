const express = require("express");
const Router = express.Router();
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

Router.get("/", getWorkouts);

// get method
Router.get("/:id", getWorkout);

// post method
Router.post("/", createWorkout);

// delete method

Router.delete("/:id", deleteWorkout)

// patch method

Router.patch("/:id", updateWorkout)


module.exports = Router;
