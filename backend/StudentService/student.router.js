//Modules
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Models
const Course = require("../Models/course.model.js");
const Student = require("../Models/student.model.js");

//Authorization of Student


//Request Handlers

router.post("/login", async (req, res) => {
    try {
        console.log(req.originalUrl)

        // const token = jwt.sign({
        //     text: "India"
        // }, process.env.JWT_SECRET);

        // res.cookie("StudentToken", token, {
        //     httpOnly: true
        // }).send();

        // console.log(req)
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
        }).json({
            name: existingStudent.name,
            email: existingStudent.email,
            center: existingStudent.center,
            permission: existingStudent.permission,
        }).send();

    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
});

router.get("/logout", (req, res) => {
    console.log(req.originalUrl)
    res.cookie("StudentToken", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
});

router.get("/loggedIn", (req, res) => {
    console.log(req.originalUrl)
    try {
        const token = req.cookies.StudentToken;
        if (!token) return res.json(false);
        jwt.verify(token, process.env.JWT_SECRET);

        res.send(true);
    } catch (err) {
        res.json(false);
    }
});

module.exports = router;