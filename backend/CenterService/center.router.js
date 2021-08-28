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

        const specificBatch = req.query.id;
        var batchList
        if (specificBatch)
            batchList = await Batch.findOne({ _id: specificBatch });
        else {
            batchList = await Batch.find({ center: center });
            const namedBatchList = []
            for (const val of batchList) {
                const batchInfo = await Batch.findOne({ _id: val });
                let facultyName = (await Employee.findOne({ _id: batchInfo.faculty }).select("name")).name;
                let courseName = (await Course.findOne({ _id: batchInfo.course }).select("title")).title;
                batchInfo.faculty = facultyName;
                batchInfo.course = courseName;
                namedBatchList.push(batchInfo);
            }

            batchList = namedBatchList;
        }
        res.status(200).json({batchList});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
})

router.post("/batch", centerAuth, async (req, res) => {
    try {
        const { name, selectedFaculty, selectedCourse } = req.body;
        const center = req.employeeInfo.center;
        var generalInfo = await GeneralInfo.findOne({ version: process.env.VERSION });

        generalInfo.batchCount += 1;

        const newBatch = new Batch({
            uid: "Batch" + generalInfo.batchCount,
            name,
            course: selectedCourse,
            faculty: selectedFaculty,
            center,
        });

        const savedBatch = await newBatch.save();

        await Employee.findOneAndUpdate({ _id: selectedFaculty }, { $push: { batchList: savedBatch._id } });

        await GeneralInfo.updateOne({ version: process.env.VERSION }, { batchCount: generalInfo.batchCount });

        res.status(200).json({ message: "Success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
})

router.post("/batch/student", centerAuth, async (req, res) => {
    try {
        const _id = req.query.id;
        const batchData = await Batch.findOne({ _id });

        let originalStudentList = batchData.studentList;
        let newStudentList = req.body.selectedStudent;
        // console.log(originalStudentList)
        // console.log(newStudentList)
        let addBatchtoStudent = newStudentList.filter(x => !originalStudentList.includes(x));
        let removeBatchfromStudent = originalStudentList.filter(x => !newStudentList.includes(x));
        // console.log(addBatchtoStudent)
        // console.log(removeBatchfromStudent)

        for (const val of addBatchtoStudent)
            await Student.findOneAndUpdate({ _id: val }, { $push: { batchList: _id } })
        for (const val of removeBatchfromStudent)
            await Student.findOneAndUpdate({ _id: val }, { $pullAll: { batchList: [_id] } })
        await Batch.findOneAndUpdate({ _id }, { studentList: newStudentList, studentCount: newStudentList.length })
        res.status(200).json({ message: "Success" });
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

        res.status(200).json({employeeList});
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

        var generalInfo = await GeneralInfo.findOne({ version: process.env.VERSION });

        var centerInfo = await Center.findOne({ name: center });

        generalInfo.employeeCount += 1;

        centerInfo.employeeCount += 1;

        const newEmployeeData = new Employee({
            uid: "E" + generalInfo.employeeCount,
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

        await GeneralInfo.updateOne({ version: process.env.VERSION }, { employeeCount: generalInfo.employeeCount });
        await Center.updateOne({ name: center }, { employeeCount: centerInfo.employeeCount, employees: centerInfo.employees });

        res.status(200).json({ message: "Success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
});

router.get("/student", centerAuth, async (req, res) => {
    try {
        const center = req.employeeInfo.center;
        const studentList = await Student.find({ center: center });
        res.status(200).json({studentList});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
});


router.post("/student", centerAuth, async (req, res) => {
    try {
        const { name,
            email,
            phone,
            enrolledCourse,
            fee,
            discount,
            netFee,
            paymentType,
            feePaid,
            feeBalance,
            address } = req.body;

        const center = req.employeeInfo.center;

        var generalInfo = await GeneralInfo.findOne({ version: process.env.VERSION });
        generalInfo.studentCount += 1;

        var centerInfo = await Center.findOne({ name: center });
        centerInfo.enrolledStudents += 1;

        const paymentDetail = {}

        const newStudent = new Student({
            uid: "Student" + generalInfo.studentCount,
            name,
            email,
            password: "login1234",
            phone,
            center,
            enrolledCourse: [enrolledCourse],
            fee,
            discount,
            netFee,
            paymentType,
            paymentDetail,
            feePaid,
            feeBalance,
            address,
        });

        await newStudent.save();
        await Center.updateOne({ name: center }, { enrolledStudents: centerInfo.enrolledStudents });
        await GeneralInfo.updateOne({ version: process.env.VERSION }, { studentCount: generalInfo.studentCount });

        res.status(200).json({ message: "Success" });
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
        message: "Success",
        name,
        email,
        center,
        permissionLevel,
    }).status(200);
});

module.exports = router;