const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    division:{
        type: String,
        required: true,
    },
    duration:{
        type: String,
        required: true,
    },
    preRequisites:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        default: 0,
    },
    net:{
        type: Number,
        default: 0,
    },
    chapters: {
        type: Array,
        default: [],
    },
    chapterCount: {
        type: Number,
        default: 0,
    }
})

const Course = mongoose.model("course", courseSchema, "courses");

module.exports = Course;