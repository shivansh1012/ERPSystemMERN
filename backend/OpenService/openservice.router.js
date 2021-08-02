//Modules
const router = require("express").Router();

//Models
const Enquiry = require("./enquiry.model.js");
const GeneralInfo = require("./generalInfo.model.js");
const Center = require("../CenterService/center.model.js");
const Course = require("./course.model.js");


//Request Handlers

router.get("/generalInfo", async (req, res) => {
    try {
        console.log(req.originalUrl)

        const generalinfo = await GeneralInfo.findOne({ tag: process.env.VERSION });

        res.status(200).json(generalinfo);
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.post("/generalInfo", async (req, res) => {
    try {
        console.log(req.originalUrl)
        const newGeneralInfo = new GeneralInfo({
            tag: process.env.VERSION,
        })
        const savedGeneralInfo = newGeneralInfo.save()

        res.status(200).json({ message: "Success" });
    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.get("/center", async (req, res) => {
    try {
        console.log(req.originalUrl)

        const centerList = await Center.find();
        res.status(200).json(centerList);

    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.get("/course", async (req, res) => {
    try {
        console.log(req.originalUrl)

        const courseList = await Course.find();
        res.status(200).json(courseList);

    } catch (e) {
        console.error(e);
        res.status(500).json({ errorMessage: "Internal Server Error" }).send();
    }
})

router.get("/enquiry", async (req, res) => {
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

router.post("/enquiry", async (req, res) => {
    try {
        console.log(req.originalUrl)
        const generalInfo = await GeneralInfo.findOne({ tag: process.env.VERSION });

        generalInfo.totalEnquiries += 1;
        generalInfo.pendingEnquiries += 1;
        // console.log(generalInfo)
        const newEnquiry = new Enquiry({
            id: generalInfo.totalEnquiries,
            name: req.body.name,
            enquiry: req.body.enquiry,
            email: req.body.email,
            mobile: req.body.mobile,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
        });

        const savedEnquiry = await newEnquiry.save();

        const updateGeneralInfo = await GeneralInfo.updateOne({ tag: process.env.VERSION }, { totalEnquiries: generalInfo.totalEnquiries, pendingEnquiries: generalInfo.pendingEnquiries });
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

module.exports = router;