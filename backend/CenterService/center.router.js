//Modules
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Models
const Course = require("../OpenService/course.model.js");
const Center = require("./center.model.js");
const Employee = require("./employees.model.js");
const Enquiry = require("../OpenService/enquiry.model.js");
const Student = require("../StudentService/student.model.js");
const GeneralInfo = require("../OpenService/generalInfo.model.js");

//Authorization of admin
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

        if (password!=existingEmployee.password)
            return res.status(401).json({ errorMessage: "Invalid email or password" });

        const token = jwt.sign({
            id: existingEmployee._id,
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

router.get("/generalInfo" , async(req, res) => {
    try {
        console.log(req.originalUrl)

        const generalinfo = await GeneralInfo.findOne({tag:"v1"});
        
        res.status(200).json(generalinfo);
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.get("/employee",  async (req, res) => {
    try {
        console.log(req.originalUrl)
        const center = req.cookies.EmployeeCenter

        const employeeList = await Employee.find({center:center});
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

        const generalInfo = await GeneralInfo.findOne({tag:"v1"});
        
        generalInfo.totalEmployees+=1;

        const newEmployeeData = new Employee({
            id: "E"+generalInfo.totalEmployees,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            contactMobile: req.body.contactMobile,
            address: req.body.address,
            center: center,
        })

        const savedEmployee = await newEmployeeData.save();
        const updateGeneralInfo = await GeneralInfo.updateOne({tag:"v1"}, {totalEmployees: generalInfo.totalEmployees});

        res.status(200).json({message: "success"});
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
});

router.get("/student",  async (req, res) => {
    try {
        console.log(req.originalUrl)
        const center = req.cookies.EmployeeCenter
        
        const studentList = await Student.find({center:center});

        res.status(200).json(studentList);
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
});

router.post("/student", centerAuth, async (req, res) => {
    try {
        console.log(req.originalUrl)

        res.status(200).json({message: "success"});
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
});

router.get("/enquiry",  async (req, res) => {
    try {
        console.log(req.originalUrl)
        const enquiryList = await Enquiry.find();
        //console.log(enquiryList)
        res.status(200).json(enquiryList);
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
        if (!token) return res.json(false);
        jwt.verify(token, process.env.JWT_SECRET);

        res.send(true);
    } catch (err) {
        res.json(false);
    }
});

module.exports = router;