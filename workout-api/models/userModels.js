const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const token = require("../controllers/userController")

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      // maxlength: 85,
      required: true,
    },

    email: {
      type: String,
      regex: { valid: true },
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// stattic login method
userSchema.statics.login = async function (userName, email, password) {
  if (!email || !password || !userName) {
    throw Error("All field must be required");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email & user name");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

// static signup method
userSchema.statics.signup = async function (
  email,
  password,
  userName,
  mobile,
  age,
  confirmPassword
) {
  // validation

  if (!email || !password || !userName || !mobile || !age || !confirmPassword) {
    throw Error("All field must be required");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (password !== confirmPassword) {
    throw Error("Password did not match");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("password is not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    userName,
    mobile,
    age,
    email,
    password: hash,
    confirmPassword,
    token
  });

  // console.log('user', user);
  return user;
};

module.exports = mongoose.model("User", userSchema);
