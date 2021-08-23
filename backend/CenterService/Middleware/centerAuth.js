const jwt = require("jsonwebtoken");

function centerAuth(req, res, next) {
  try {
    const employeeToken = req.cookies.EmployeeToken;

    if (!employeeToken) 
      return res.json({ authorized: false, message: "Unauthorized" });

    req.employeeInfo = jwt.verify(employeeToken, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.json({ authorized: false, message: "Unauthorized" });
  }
}

module.exports = centerAuth;