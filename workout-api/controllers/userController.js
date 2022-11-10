const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get all user data
const getData = async (req, res) => {
  // const user_id = req.user._id;

  const workouts = User.find({})
    .sort({ createdAt: -1 })
    .exec(function (err, doc) {
      // console.log("doc", doc);
      res.status(200).json(doc);
    });
};

// get single user data
const singleData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }

  const single = await User.findById(id);

  if (!single) {
    return res.status(404).json({ error: "no such workout" });
  }

  res.status(200).json(single);
};

// Delete a user data
const deleteData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }

  const data = await User.findOneAndDelete({ _id: id });

  if (!data) {
    return res.status(404).json({ error: "no such workout" });
  }

  res.status(200).json(data);
};

// update workout
const updateData = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such workout" });
  }

  let update = User.findOneAndUpdate(
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
  signupUser,
  loginUser,
  getData,
  singleData,
  deleteData,
  updateData,
};
