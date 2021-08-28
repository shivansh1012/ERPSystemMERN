const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    uid:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    employeeType:{
        type: String,
        required: true,
    },
    permissionLevel:{
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
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
    center:{
        type: String,
        required: true,
    },
    batchList:{
        type: Array,
        default: true,
    }
})

const Employee = mongoose.model("employee", employeeSchema, "employee");

module.exports = Employee;