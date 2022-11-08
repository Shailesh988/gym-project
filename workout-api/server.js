const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const workoutsRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

app.use(express.json());

app.use((req, res, next) => {
  console.log(
    "haan bhai path or method bata raha hu dekh le =>",
    req.path,
    req.method
  );
  next();
});

app.use("/api/workouts", workoutsRoutes);

app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MOGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to db & Server is up and running...",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
