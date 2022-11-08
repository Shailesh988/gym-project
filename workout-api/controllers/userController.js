const User = require("../models/userModels");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};


// login a user
const loginUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const user = await User.login(userName,email, password);
    // cretae tokens
    const token = createToken(user._id);
    res.status(200).json({ msgg:"logged in",email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, userName, mobile, age, confirmPassword } = req.body;

  console.log(req.body);

  try {
    const user = await User.signup(
      email,
      password,
      userName,
      mobile,
      age,
      confirmPassword
    );
    // console.log("user controller", user);

    res.status(200).json({ msg: "Thankyou for register" });
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
