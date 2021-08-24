const jwt = require("jsonwebtoken");

function studentAuth(req, res, next) {
  try {
    const studentToken = req.cookies.StudentToken;

    if (!studentToken) 
      return res.json({ authorized: false, message: "Unauthorized" });

    req.studentInfo = jwt.verify(studentToken, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.json({ authorized: false, message: "Unauthorized" });
  }
}

module.exports = studentAuth;