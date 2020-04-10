const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(Error("Authentication failed!"));
    }
    const decodedToken = jwt.verify(token,process.env.JWT_KEY);
    req.adminData = {adminId: decodedToken.adminId};
    next();
  } catch (err) {
    return next(Error("Authentication failed!"));
  }
};
