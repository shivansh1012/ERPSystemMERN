//Modules
const router = require("express").Router();

//Models
const Enquiry = require("../Models/enquiry.model.js");
const GeneralInfo = require("../Models/generalInfo.model.js");
const Center = require("../Models/center.model.js");
const Course = require("../Models/course.model.js");

//Request Handlers
router.get("/generalInfo", async (req, res) => {
    try {
        const generalInfo = await GeneralInfo.findOne({ version: process.env.VERSION });

        res.status(200).json({ generalInfo });
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.post("/generalInfo", async (req, res) => {
    try {
        const newGeneralInfo = new GeneralInfo({
            version: process.env.VERSION,
        })
        await newGeneralInfo.save()

        res.status(200).json({ message: "Success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.get("/center", async (req, res) => {
    try {
        const centerList = await Center.find();

        res.status(200).json({ centerList: centerList });
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.get("/course", async (req, res) => {
    try {
        const courseID = req.query.id;
        let courseList

        if (courseID)
            courseList = await Course.findOne({ "_id": courseID });
        else
            courseList = await Course.find();

        res.status(200).json({ courseList });
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.post("/course/:id", async (req, res) => {
    try {
        const courseID = req.params.id;
        const chapterData = req.body.chapters;

        await Course.findOneAndUpdate({ "_id": courseID }, { chapters: chapterData, chapterCount: chapterData.length });

        res.status(200).json({ message: "Success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

router.get("/enquiry", async (req, res) => {
    try {
        const enquiryList = await Enquiry.find();

        res.status(200).json(enquiryList);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post("/enquiry", async (req, res) => {
    try {
        const { name,
            enquiry,
            email,
            mobile,
            address,
            city,
            state,
            country } = req.body;

        const generalInfo = await GeneralInfo.findOne({ version: process.env.VERSION });

        generalInfo.totalEnquiries += 1;
        generalInfo.pendingEnquiries += 1;

        const newEnquiry = new Enquiry({
            uid: generalInfo.totalEnquiries,
            name,
            enquiry,
            email,
            mobile,
            address,
            city,
            state,
            country,
        });

        await newEnquiry.save();
        await GeneralInfo.updateOne({ version: process.env.VERSION }, { totalEnquiries: generalInfo.totalEnquiries, pendingEnquiries: generalInfo.pendingEnquiries });

        res.status(200).json({ message: "Success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
})

router.patch("/enquiry", async (req, res) => {
    try {
        const { _id, oldValue, newValue } = req.body;

        if (newValue === "Not Interested") {
            await GeneralInfo.findOneAndUpdate({ version: process.env.VERSION }, { $inc: { pendingEnquiries: -1, archivedEnquiries: 1 } });
        }
        else if (oldValue === "Not Interested")
            await GeneralInfo.findOneAndUpdate({ version: process.env.VERSION }, { $inc: { pendingEnquiries: 1, archivedEnquiries: -1 } });

        await Enquiry.findOneAndUpdate({ _id: _id }, { status: newValue });

        res.status(200).json({ message: "Success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal Server Error" }).send();
    }
})

module.exports = router;