const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  //verify authenticate

  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
  }
};
