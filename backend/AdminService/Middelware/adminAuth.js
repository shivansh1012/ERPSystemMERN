const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  try {
    const token = req.cookies.AdminToken;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.adminInfo = verified;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = adminAuth;