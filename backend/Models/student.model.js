const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    id: {
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
    phone: {
        type: String,
        required: true,
    },
    center:{
        type: String,
        required: true,
    },
    enrollmentDate:{
        type: Date,
        required: true,
    },
    enrolledSubject:{
        type: Array,
        required: true,
    },
    fees:{
        type: Number,
        required: true,
    },
    feesPaid:{
        type: Number,
        required: true,
    },
    feesBalance:{
        type: Number,
        required: true,
    },
})

const Student = mongoose.model("student", studentSchema, "student");

module.exports = Student;