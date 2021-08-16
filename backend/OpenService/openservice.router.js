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
        const generalinfo = await GeneralInfo.findOne({ tag: process.env.VERSION });

        res.status(200).json(generalinfo);
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.post("/generalInfo", async (req, res) => {
    try {
        const newGeneralInfo = new GeneralInfo({
            tag: process.env.VERSION,
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

        res.status(200).json(centerList);
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.get("/course", async (req, res) => {
    try {
        const courseList = await Course.find();

        res.status(200).json(courseList);
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.get("/course/:id", async (req, res) => {
    try {
        const courseID = req.params.id;

        const courseList = await Course.find({ "_id": courseID });

        res.status(200).json(courseList);
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

        res.status(200).send();
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.get("/enquiry", async (req, res) => {
    try {
        const enquiryList = await Enquiry.find();

        res.status(200).json(enquiryList);
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
});

router.post("/enquiry", async (req, res) => {
    try {
        const { name, enquiry, email, mobile, address, city, state, country } = req.body;
        const generalInfo = await GeneralInfo.findOne({ tag: process.env.VERSION });

        generalInfo.totalEnquiries += 1;
        generalInfo.pendingEnquiries += 1;

        const newEnquiry = new Enquiry({
            id: generalInfo.totalEnquiries,
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
        await GeneralInfo.updateOne({ tag: process.env.VERSION }, { totalEnquiries: generalInfo.totalEnquiries, pendingEnquiries: generalInfo.pendingEnquiries });

        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

router.patch("/enquiry", async (req, res) => {
    try {
        const generalInfo = await GeneralInfo.findOne({ tag: process.env.VERSION });

        if (req.body.status === "Not Interested") {
            generalInfo.archivedEnquiries += 1;
            generalInfo.pendingEnquiries -= 1;
            await GeneralInfo.updateOne({ tag: process.env.VERSION }, { archivedEnquiries: generalInfo.archivedEnquiries, pendingEnquiries: generalInfo.pendingEnquiries });
        }
        await Enquiry.updateOne({ id: req.body.id }, { status: req.body.status });

        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

module.exports = router;