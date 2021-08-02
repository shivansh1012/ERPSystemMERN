const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    permission:{
        type: Number,
        default:0
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
    }
})

const Employee = mongoose.model("employee", employeeSchema, "employee");

module.exports = Employee;