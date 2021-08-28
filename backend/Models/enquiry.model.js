const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
    uid: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    enquiry: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending"
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
})

const Enquiry = mongoose.model("enquiry", enquirySchema, "enquiry");

module.exports = Enquiry;