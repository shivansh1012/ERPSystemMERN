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
            return res.status(400).json({ message: "Please enter all fields" });
        if (password.length < 6)
            return res.status(400).json({ message: "Please enter password of length more than 6 chars" });

        const existingAdmin = await Admin.findOne({ email: email });

        if (existingAdmin)
            return res.status(400).json({ message: "User already exists" });

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
            return res.status(400).json({ message: "Please enter all fields" });

        const existingAdmin = await Admin.findOne({ email: email });

        if (!existingAdmin)
            return res.status(401).json({ message: "Invalid email or password" });

        const isPasswordValid = bcrypt.compare(password, existingAdmin.passwordHash);

        if (!isPasswordValid)
            return res.status(401).json({ message: "Invalid email or password" });

        const adminToken = jwt.sign({
            _id: existingAdmin._id,
            name: existingAdmin.email,
            email: existingAdmin.email
        }, process.env.JWT_SECRET);

        res.status(200)
            .cookie("AdminToken", adminToken, { httpOnly: true })
            .json({ message: "Login Success" })
            .send();

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
})

router.post("/center", adminAuth, async (req, res) => {
    try {
        const { name,
            contactEmail,
            contactMobile,
            address,
            city,
            state,
            country } = req.body

        const generalInfo = await GeneralInfo.findOne({ tag: process.env.VERSION });

        generalInfo.totalCenters += 1;
        generalInfo.totalEmployees += 1;

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

        const newEmployeeData = await newEmployee.save();

        const newCenter = new Center({
            id: "C" + generalInfo.totalCenters,
            name,
            contactEmail,
            contactMobile,
            address,
            city,
            state,
            country,
            employees: [newEmployeeData._id]
        });

        await newCenter.save();

        await GeneralInfo.updateOne({ tag: process.env.VERSION }, { totalCenters: generalInfo.totalCenters, totalEmployees: generalInfo.totalEmployees });

        res.status(200).json({ message: "success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
})

router.post("/course", adminAuth, async (req, res) => {
    try {
        const { title,
            description,
            division,
            duration,
            preRequisites,
            price,
            discount } = req.body

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

        res.status(200).json({ message: "success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
})

router.get("/logout", (req, res) => {

    res.cookie("AdminToken", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
});

router.get("/loggedIn", adminAuth, (req, res) => {
    const { name, email } = req.adminInfo;

    return res.json({
        authorized: true,
        message: "success",
        name,
        email
    }).status(200);
});

module.exports = router;