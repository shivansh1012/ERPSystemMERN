//Modules
const router = require("express").Router();

//Models
const Enquiry = require("./enquiry.model.js");
const GeneralInfo = require("./generalInfo.model.js");

//Request Handlers
router.post("/enquiry", async (req, res) => {
    try {
        console.log(req.originalUrl)
        const generalInfo = await GeneralInfo.findOne({ tag: "v1" });

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

        const updateGeneralInfo = await GeneralInfo.updateOne({ tag: "v1" }, { totalEnquiries: generalInfo.totalEnquiries, pendingEnquiries: generalInfo.pendingEnquiries });
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
})

module.exports = router;