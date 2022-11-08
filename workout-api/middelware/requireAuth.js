const jwt = require("jsonwebtoken");
const user = require("../models/userModels");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await user.find({ _id }).select("_id");

    next();
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Request is not authorize " });
  }
};

module.exports = requireAuth;
