//Modules
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Models
const Course = require("../Models/course.model.js");
const Employee = require("../Models/employee.model.js");
const Center = require("../Models/center.model.js");
const Admin = require("../Models/admin.model.js")
const GeneralInfo = require("../Models/generalInfo.model.js");

//Authorization of admin
const adminAuth = require("./Middelware/adminAuth.js");

//Request Handlers

router.post("/register", async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ errorMessage: "Please enter all fields" });
        if (password.length < 6)
            return res.status(400).json({ errorMessage: "Please enter password of length more than 6 chars" });

        const existingAdmin = await Admin.findOne({ email: email });

        if (existingAdmin)
            return res.status(400).json({ errorMessage: "User already exists" });

        //password hashing
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            email: email,
            password: password,
            passwordHash: passwordHash
        });

        await newAdmin.save();

        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

router.post("/login", async (req, res) => {
    try {


        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ errorMessage: "Please enter all fields" });

        const existingAdmin = await Admin.findOne({ email: email });

        if (!existingAdmin)
            return res.status(401).json({ errorMessage: "Invalid email or password" });

        const isPasswordValid = bcrypt.compare(password, existingAdmin.passwordHash);

        if (!isPasswordValid)
            return res.status(401).json({ errorMessage: "Invalid email or password" });

        const token = jwt.sign({
            id: existingAdmin._id,
            email: existingAdmin.email
        }, process.env.JWT_SECRET);

        res.cookie("AdminToken", token, {
            httpOnly: true
        }).status(200).send();

    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.post("/center", adminAuth, async (req, res) => {
    try {
        const generalInfo = await GeneralInfo.findOne({ tag: process.env.VERSION });

        const { name, contactEmail, contactMobile, address, city, state, country } = req.body

        generalInfo.totalCenters += 1;
        generalInfo.totalEmployees += 1;

        const newCenter = new Center({
            id: "C" + generalInfo.totalCenters,
            name,
            contactEmail,
            contactMobile,
            address,
            city,
            state,
            country,
            employees: ["admin" + name + process.env.DOMAIN_NAME]
        });

        const newEmployee = new Employee({
            id: "E" + generalInfo.totalEmployees,
            name: "admin" + name,
            employeeType: "Admin",
            permissionLevel: 0,
            email: "admin" + name + process.env.DOMAIN_NAME,
            password: "admin1234",
            contactMobile: "admin",
            address: "admin",
            center: name
        })
        generalInfo.centers.push(name);

        await newCenter.save();
        await newEmployee.save();
        await GeneralInfo.updateOne({ tag: process.env.VERSION }, { totalCenters: generalInfo.totalCenters, centers: generalInfo.centers, totalEmployees: generalInfo.totalEmployees });

        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.post("/course", adminAuth, async (req, res) => {
    try {
        const { title, description, division, duration, preRequisites, price, discount } = req.body

        const generalInfo = await GeneralInfo.findOne({ tag: process.env.VERSION });
        generalInfo.totalCourses += 1;

        const newCourse = new Course({
            id: "Course" + generalInfo.totalCourses,
            title,
            description,
            division,
            duration,
            preRequisites,
            price,
            discount
        })

        await newCourse.save();
        await GeneralInfo.updateOne({ tag: process.env.VERSION }, { totalCourses: generalInfo.totalCourses });

        res.status(200).send();
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.get("/logout", (req, res) => {

    res.cookie("AdminToken", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
});

router.get("/loggedIn", (req, res) => {

    try {
        const token = req.cookies.AdminToken;
        if (!token) return res.json({ authorized: false });
        jwt.verify(token, process.env.JWT_SECRET);

        decodedToken = jwt.decode(token, process.env.JWT_SECRET);

        res.json({
            authorized: true,
            name: decodedToken.email,
            email: decodedToken.email
        }).status(200);
    } catch (err) {
        res.status(400).json({ authorized: false }).send();
    }
});

module.exports = router;