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
    subjects: {
        type: Array,
        required: true,
    },
    students: {
        type: Array,
        required: true,
    },
    faculty: {
        type: Array,
        required: true,
    },
    
})

const Batch = mongoose.model("batch", batchSchema, "batch");

module.exports = Batch;