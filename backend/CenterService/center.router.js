//Modules
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Models
const Course = require("../Models/course.model.js");
const Center = require("../Models/center.model.js");
const Employee = require("../Models/employees.model.js");
const Enquiry = require("../Models/enquiry.model.js");
const Student = require("../Models/student.model.js");
const GeneralInfo = require("../Models/generalInfo.model.js");

//Authorization of center
const centerAuth = require("./Middleware/centerAuth.js");

//Request Handlers

router.post("/login", async (req, res) => {
    try {
        console.log(req.originalUrl)

        // console.log(req)
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ errorMessage: "Please enter all fields" });

        const existingEmployee = await Employee.findOne({ email: email });

        if (!existingEmployee)
            return res.status(401).json({ errorMessage: "Invalid email or password" });

        if (password != existingEmployee.password)
            return res.status(401).json({ errorMessage: "Invalid email or password" });

        const token = jwt.sign({
            id: existingEmployee._id,
            name: existingEmployee.name,
            email: existingEmployee.email,
            center: existingEmployee.center,
            permission: existingEmployee.permission,
        }, process.env.JWT_SECRET);

        res.cookie("EmployeeToken", token, {
            httpOnly: true
        }).cookie("EmployeeName", existingEmployee.name, {
            httpOnly: true
        }).cookie("EmployeeCenter", existingEmployee.center, {
            httpOnly: true
        }).json({
            name: existingEmployee.name,
            email: existingEmployee.email,
            center: existingEmployee.center,
            permission: existingEmployee.permission,
        }).send();

    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
});

router.get("/employee", async (req, res) => {
    try {
        console.log(req.originalUrl)
        const center = req.cookies.EmployeeCenter

        const employeeList = await Employee.find({ center: center });
        //console.log(enquiryList)
        res.status(200).json(employeeList);
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
});

router.post("/employee", centerAuth, async (req, res) => {
    try {
        console.log(req.originalUrl)
        const center = req.cookies.EmployeeCenter

        var generalInfo = await GeneralInfo.findOne({ tag: process.env.VERSION });
        var centerInfo = await Center.findOne({ name: center });

        generalInfo.totalEmployees += 1;

        centerInfo.totalEmployees += 1;
        centerInfo.employees.push(req.body.email);

        const newEmployeeData = new Employee({
            id: "E" + generalInfo.totalEmployees,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            contactMobile: req.body.contactMobile,
            address: req.body.address,
            center: center,
        })

        await newEmployeeData.save();
        await GeneralInfo.updateOne({ tag: process.env.VERSION }, { totalEmployees: generalInfo.totalEmployees });
        await Center.updateOne({ name: center }, { totalEmployees: centerInfo.totalEmployees, employees: centerInfo.employees });
        
        res.status(200).json({ message: "success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
});

router.get("/student", async (req, res) => {
    try {
        console.log(req.originalUrl)
        const center = req.cookies.EmployeeCenter

        const studentList = await Student.find({ center: center });

        res.status(200).json(studentList);
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
});

router.post("/student", centerAuth, async (req, res) => {
    try {
        console.log(req.originalUrl)
        const center = req.cookies.EmployeeCenter

        var centerInfo = await Center.findOne({ name: center });

        res.status(200).json({ message: "success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
});

router.get("/logout", (req, res) => {
    console.log(req.originalUrl)
    res.cookie("EmployeeToken", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
});

router.get("/loggedIn", (req, res) => {
    console.log(req.originalUrl)
    try {
        const token = req.cookies.EmployeeToken;
        if (!token) return res.json({ authorized: false });
        decodedToken = jwt.decode(token, process.env.JWT_SECRET);
        // console.log(decodedToken)
        res.json({
            authorized: true,
            name: decodedToken.name,
            email: decodedToken.email,
            center: decodedToken.center,
            permission: decodedToken.permission,
        }).status(200);
    } catch (err) {
        res.json({ authorized: false });
    }
});

module.exports = router;