//Modules
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const studentAuth = require("./Middleware/studentAuth.js");

//Models
const Student = require("../Models/student.model.js");

//Request Handlers
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Please enter all fields" });

        const existingStudent = await Student.findOne({ email: email });

        if (!existingStudent)
            return res.status(401).json({ message: "Invalid email or password" });

        if (password != existingStudent.password)
            return res.status(401).json({ message: "Invalid email or password" });

        const token = jwt.sign({
            _id: existingStudent._id,
            name: existingStudent.name,
            email: existingStudent.email,
            center: existingStudent.center,
        }, process.env.JWT_SECRET);

        res.status(200)
            .cookie("StudentToken", token, { httpOnly: true })
            .json({ message: "Login Success" })
            .send();
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
});

router.get("/logout", (req, res) => {
    res.cookie("StudentToken", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
});

router.get("/loggedIn", studentAuth, (req, res) => {
    const { name, email, center } = req.studentInfo;

    return res.json({
        authorized: true,
        message: "success",
        name,
        email,
        center
    }).status(200);
});

module.exports = router;