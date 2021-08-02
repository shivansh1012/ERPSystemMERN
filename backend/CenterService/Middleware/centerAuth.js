const jwt = require("jsonwebtoken");

function centerAuth(req, res, next) {
  try {
    const token = req.cookies.EmployeeToken;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.EmployeeInfo = verified;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = centerAuth;