const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    studentList: {
        type: Array,
        default: [],
    },
    studentCount: {
        type: Number,
        default: 0,
    },
    faculty: {
        type: String,
        required: true,
    },
    center: {
        type: String,
        required: true,
    },
    
})

const Batch = mongoose.model("batch", batchSchema, "batch");

module.exports = Batch;