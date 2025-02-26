const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  // console.log(req.headers);

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }
  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return res.status(403).json({ message: "Access Forbidden!!" });
    }
    req.email = decode.email;
    req.role = decode.role;

    next();
  });
};
isAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return res.status(403).json({ message: "Admin Access Only" });
  }
  next();
};

const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;
