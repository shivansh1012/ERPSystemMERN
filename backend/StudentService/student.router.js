//Modules
const router = require("express").Router();
const jwt = require("jsonwebtoken");

//Models
const Student = require("../Models/student.model.js");

//Request Handlers
router.post("/login", async (req, res) => {
    try {
        // const token = jwt.sign({
        //     text: "India"
        // }, process.env.JWT_SECRET);

        // res.cookie("StudentToken", token, {
        //     httpOnly: true
        // }).send();

        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ errorMessage: "Please enter all fields" });

        const existingStudent = await Student.findOne({ email: email });

        if (!existingStudent)
            return res.status(401).json({ errorMessage: "Invalid email or password" });

        if (password != existingStudent.password)
            return res.status(401).json({ errorMessage: "Invalid email or password" });

        const token = jwt.sign({
            id: existingStudent._id,
            email: existingStudent.email,
            center: existingStudent.center,
        }, process.env.JWT_SECRET);

        res.cookie("StudentToken", token, {
            httpOnly: true
        }).cookie("StudentName", existingStudent.name, {
            httpOnly: true
        }).cookie("StudentCenter", existingStudent.center, {
            httpOnly: true
        }).send();

    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
});

router.get("/logout", (req, res) => {

    res.cookie("StudentToken", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
});

router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.StudentToken;

        if (!token) return res.json({ authorized: false });

        jwt.verify(token, process.env.JWT_SECRET);

        res.json({ authorized: true }).status(200).send();
    } catch (err) {
        res.status(400).json({ authorized: false }).send();
    }
});

module.exports = router;