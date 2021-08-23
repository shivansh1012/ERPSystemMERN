const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    students: {
        type: Array,
        required: true,
    },
    studentCount: {
        type: Number,
        required: true,
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