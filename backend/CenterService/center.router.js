//Modules
const router = require("express").Router();
const jwt = require("jsonwebtoken");

//Models
const Course = require("../Models/course.model.js");
const Center = require("../Models/center.model.js");
const Employee = require("../Models/employee.model.js");
const Student = require("../Models/student.model.js");
const GeneralInfo = require("../Models/generalInfo.model.js");
const Batch = require("../Models/batch.model.js");

//Authorization of center
const centerAuth = require("./Middleware/centerAuth.js");

//Request Handlers
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ message: "Please enter all fields" });

        const existingEmployee = await Employee.findOne({ email: email });

        if (!existingEmployee)
            return res.status(401).json({ message: "Invalid email or password" });

        if (password != existingEmployee.password)
            return res.status(401).json({ message: "Invalid email or password" });

        const employeeToken = jwt.sign({
            _id: existingEmployee._id,
            name: existingEmployee.name,
            email: existingEmployee.email,
            center: existingEmployee.center,
            permissionLevel: existingEmployee.permissionLevel,
        }, process.env.JWT_SECRET);

        res.status(200)
            .cookie("EmployeeToken", employeeToken, { httpOnly: true })
            .json({ message: "Login Success" })
            .send();
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
});


router.get("/batch", centerAuth, async (req, res) => {
    try {
        const center = req.employeeInfo.center;

        const batchList = await Batch.find({ center: center });

        res.status(200).json(batchList);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
})

router.post("/batch", centerAuth, async (req, res) => {
    try {
        res.status(200).json({ message: "success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
})


router.get("/employee", centerAuth, async (req, res) => {
    try {
        const center = req.employeeInfo.center;
        const typeFilter = req.query.type;

        if (typeFilter)
            var employeeList = await Employee.find({ center: center, employeeType: typeFilter });
        else
            var employeeList = await Employee.find({ center: center });

        res.status(200).json(employeeList);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
});

router.post("/employee", centerAuth, async (req, res) => {
    try {
        const { name,
            employeeType,
            permissionLevel,
            email,
            password,
            contactMobile,
            address } = req.body;
        const center = req.employeeInfo.center;

        var generalInfo = await GeneralInfo.findOne({ tag: process.env.VERSION });

        var centerInfo = await Center.findOne({ name: center });

        generalInfo.totalEmployees += 1;

        centerInfo.totalEmployees += 1;

        const newEmployeeData = new Employee({
            id: "E" + generalInfo.totalEmployees,
            name,
            employeeType,
            permissionLevel,
            email,
            password,
            contactMobile,
            address,
            center,
        })

        const savedEmployeeData = await newEmployeeData.save();

        centerInfo.employees.push(savedEmployeeData._id);

        await GeneralInfo.updateOne({ tag: process.env.VERSION }, { totalEmployees: generalInfo.totalEmployees });
        await Center.updateOne({ name: center }, { totalEmployees: centerInfo.totalEmployees, employees: centerInfo.employees });

        res.status(200).json({ message: "success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
});

router.get("/student", async (req, res) => {
    try {
        const center = req.cookies.EmployeeCenter

        const studentList = await Student.find({ center: center });

        res.status(200).json(studentList);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
});


router.post("/student", centerAuth, async (req, res) => {
    try {

        const center = req.cookies.EmployeeCenter

        var centerInfo = await Center.findOne({ name: center });

        res.status(200).json({ message: "success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
});

router.get("/logout", (req, res) => {
    res.cookie("EmployeeToken", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send();
});

router.get("/loggedIn", centerAuth, (req, res) => {
    const { name, email, center, permissionLevel } = req.employeeInfo;

    return res.json({
        authorized: true,
        message: "success",
        name,
        email,
        center,
        permissionLevel,
    }).status(200);
});

module.exports = router;