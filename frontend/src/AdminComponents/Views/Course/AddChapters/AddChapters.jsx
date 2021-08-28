import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { apiBaseURL } from "../../../../Config";

import {
    TextField,
    Button,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
    Container,
    IconButton
} from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(1),
    }
}))

export default function AddChapters() {
    const classes = useStyles()

    const [selectedCourse, setSelectedCourse] = useState('')
    const [course, setCourse] = useState(undefined)

    const [inputFields, setInputFields] = useState([
        { id: uuidv4(), chapterNumber: '', chapterName: '' },
    ]);

    const getCourseDetails = async () => {
        await axios
        .get(`${apiBaseURL}/service/course`)
        .then((res) => {
            setCourse(res.data)
        })
        .catch((err) => {
            console.error(err);
            alert(err)
        })
    }
    
    useEffect(() => {
        getCourseDetails();
    }, [])

    const changeCourse = async (e) => {
        setSelectedCourse(e.target.value)
        await axios
            .get(`${apiBaseURL}/service/course/?id=${e.target.value}`)
            .then((res) => {
                // console.log(res.data[0])
                if (res.data[0].chapters.length === 0) {
                    setInputFields([
                        { id: uuidv4(), chapterNumber: '', chapterName: '' },])
                }
                else {
                    setInputFields(res.data[0].chapters)
                }
            })
            .catch((err) => {
                console.error(err);
                alert(err)
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(inputFields);
        for (let val = 0; val < inputFields.length; val++) {
            if (inputFields[val]["chapterNumber"] === "" || inputFields[val]["chapterName"] === "")
                inputFields.splice(val)
        }
        var FormData = {
            chapters: inputFields,
        }
        await axios
            .post(`${apiBaseURL}/service/course/${selectedCourse}`, FormData, {
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

    };

    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map(i => {
            if (id === i.id) {
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setInputFields(newInputFields);
    }

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: uuidv4(), chapterNumber: '', chapterName: '' }])
    }

    const handleRemoveFields = id => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }

    return (
        <Container>
            <h1 style={{ textAlign: "center" }}>Update Chapters</h1>
            <form className={classes.root} onSubmit={handleSubmit}>
                <FormControl style={{ display: "flex", width: "480px", flexDirection: "column" }}>
                    <InputLabel id="course-select">Select Course</InputLabel>
                    <Select
                        labelId="course-select"
                        id="course-select"
                        value={selectedCourse}
                        onChange={changeCourse}>
                        {course !== undefined && course.map((cour) => (
                            <MenuItem key={cour._id} value={cour._id}>{cour.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {inputFields.map(inputField => (
                    <div key={inputField.id}>
                        <TextField
                            name="chapterNumber"
                            label="chapterNumber"
                            value={inputField.chapterNumber}
                            onChange={event => handleChangeInput(inputField.id, event)}
                        />
                        <TextField
                            name="chapterName"
                            label="chapterName"
                            value={inputField.chapterName}
                            onChange={event => handleChangeInput(inputField.id, event)}
                        />
                        <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                            <RemoveIcon />
                        </IconButton>
                        <IconButton
                            onClick={handleAddFields}
                        >
                            <AddIcon />
                        </IconButton>
                    </div>
                ))}
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                >Save</Button>
            </form>
        </Container>
    );
}
