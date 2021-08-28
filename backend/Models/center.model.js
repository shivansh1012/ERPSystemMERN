const mongoose = require("mongoose");

const centerSchema = new mongoose.Schema({
    uid:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
    },
    contactMobile: {
        type: String,
        required: true,
    },
    address:{
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
    enrolledStudents:{
        type: Number,
        default:0
    },
    totalEmployees:{
        type: Number,
        default:1
    },
    employees:{
        type:Array,
        required: true,
    }
})

const Center = mongoose.model("center", centerSchema, "center");

module.exports = Center;