const mongoose = require("mongoose");

const generalInfoSchema = new mongoose.Schema({
    tag:{
        type: String,
    },
    totalCenters:{
        type: Number,
        default: 0,
    },
    centers: {
        type: Array,
        default:[]
    },
    totalEmployees:{
        type: Number,
        default: 0,
    },
    totalStudents:{
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