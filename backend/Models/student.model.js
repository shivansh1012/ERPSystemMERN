const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
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
    phone: {
        type: String,
        required: true,
    },
    center: {
        type: String,
        required: true,
    },
    enrollmentDate: {
        type: Date,
        default: Date.now,
    },
    enrolledCourse: {
        type: Array,
        default: [],
    },
    fee: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
    },
    netFee: {
        type: Number,
        required: true,
    },
    paymentType: {
        type: String,
        required: true,
    },
    paymentDetail: {
        type: Map,
        required: true,
    },
    feePaid: {
        type: Number,
        required: true,
    },
    feeBalance: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    batchList:{
        type: Array,
        default : [],
    }
});

const Student = mongoose.model("student", studentSchema, "student");

module.exports = Student;