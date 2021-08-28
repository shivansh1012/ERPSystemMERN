const mongoose = require("mongoose");

const generalInfoSchema = new mongoose.Schema({
    version:{
        type: String,
    },
    centerCount:{
        type: Number,
        default: 0,
    },
    courseCount:{
        type: Number,
        default: 0,
    },
    batchCount:{
        type: Number,
        default: 0,
    },
    employeeCount:{
        type: Number,
        default: 0,
    },
    studentCount:{
        type: Number,
        default: 0,
    },
    totalEnquiries: {
        type: Number,
        default: 0,
    },
    pendingEnquiries: {
        type: Number,
        default: 0,
    },
    archivedEnquiries: {
        type: Number,
        default: 0,
    },
})

const GeneralInfo = mongoose.model("generalInfo", generalInfoSchema, "generalInfo");

module.exports = GeneralInfo;