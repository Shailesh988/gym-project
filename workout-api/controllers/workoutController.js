const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workout
const getWorkouts = async (req, res) => {
  // const user_id = req.user._id;

  const workouts = Workout.find({})
    .sort({ createdAt: -1 })
    .exec(function (err, doc) {
      // console.log("doc", doc);
      res.status(200).json(doc);
    });
};

// get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }

  res.status(200).json(workout);
};

// create new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  //  add doc to db
  try {
    // const user_id = req.user._id;
    const workout = await Workout.create({ title, reps, load });

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }

  res.status(200).json(workout);
};

// update workout
const updateWorkout = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }

  let workout = Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  ).exec(function (err, doc) {
    if (err) {
      res.status(404).json({ mgg: "no such workout" });
    }

    res.status(200).json(doc);
  });
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
