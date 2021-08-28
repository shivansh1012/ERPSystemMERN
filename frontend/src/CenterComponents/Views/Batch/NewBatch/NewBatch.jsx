import React, { useState, useEffect } from 'react';
import axios from "axios";
import { apiBaseURL } from "../../../../Config"

import {
    TextField,
    Button,
    InputLabel,
    FormControl,
    MenuItem,
    Select
} from "@material-ui/core";

export default function NewBatch() {
    const [name, setName] = useState('');

    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [facultyList, setFacultyList] = useState([]);

    const [selectedCourse, setSelectedCourse] = useState('')
    const [courseList, setCourseList] = useState([])

    async function Submit(e) {
        e.preventDefault();
        var FormData = {
            name,
            selectedFaculty,
            selectedCourse,
        }
        axios
            .post(`${apiBaseURL}/center/batch`, FormData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                alert(res.data.message)
            })
            .catch((err) => {
                console.log(err);
                alert("Error")
            });
    }

    const getFacultyList = async () => {
        await axios
            .get(`${apiBaseURL}/center/employee/?type=Faculty`)
            .then((res) => {
                setFacultyList(res.data.employeeList)
            })
            .catch((err) => {
                console.error(err);
                alert(`Faculty error ${err}`)
            })
    }

    const getCourseDetails = async () => {
        await axios
            .get(`${apiBaseURL}/service/course`)
            .then((res) => {
                setCourseList(res.data.courseList)
            })
            .catch((err) => {
                console.error(err);
                alert(`Course error ${err}`)
            })
    }

    const changeFaculty = (e) => {
        setSelectedFaculty(e.target.value)
    }

    useEffect(() => {
        getFacultyList();
        getCourseDetails();
    }, [])

    return (
        <div className="form page">
            <h1>New Batch</h1>
            <form className="register-fields">
                <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <FormControl style={{ display: "flex", width: "480px", flexDirection: "column" }}>
                    <InputLabel id="course-select">Select Faculty</InputLabel>
                    <Select
                        labelId="course-select"
                        id="course-select"
                        value={selectedFaculty}
                        onChange={changeFaculty}>
                        {facultyList !== undefined && facultyList.map((fact) => (
                            <MenuItem key={fact._id} value={fact._id}>{fact.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl style={{ display: "flex", width: "480px", flexDirection: "column" }}>
                    <InputLabel id="course-select">Select Course</InputLabel>
                    <Select
                        labelId="course-select"
                        id="course-select"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}>
                        {courseList !== undefined && courseList.map((cour) => (
                            <MenuItem key={cour._id} value={cour._id}>{cour.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <Button color="primary" variant="outlined" onClick={Submit}>Add</Button>
            </form>
        </div>
    )
}
