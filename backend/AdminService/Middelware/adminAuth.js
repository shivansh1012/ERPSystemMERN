const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  try {
    const adminToken = req.cookies.AdminToken;

    if (!adminToken) 
      return res.json({ authorized: false, message: "Unauthorized" });

    req.adminInfo = jwt.verify(adminToken, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.json({ authorized: false, message: "Unauthorized" });
  }
}

module.exports = adminAuth;