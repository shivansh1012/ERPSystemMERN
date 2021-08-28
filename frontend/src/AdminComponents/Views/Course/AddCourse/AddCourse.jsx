import React, { useState } from 'react';
import "./addCourse.css";
import { TextField, Button, InputLabel, InputAdornment, Input, FormControl } from "@material-ui/core";
import axios from "axios";
import { apiBaseURL } from "../../../../Config"

export default function AddCourse() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [division, setDivision] = useState('')
    const [duration, setDuration] = useState('')
    const [preRequisites, setPreRequisites] = useState('')
    const [net, setNet] = useState(0)

    async function Submit(e) {
        e.preventDefault();
        var FormData = {
            title: title,
            description: description,
            division: division,
            duration: duration,
            preRequisites: preRequisites,
            net: net
        }
        axios
            .post(`${apiBaseURL}/admin/course`, FormData, {
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

    return (
        <div className="form page">
            <h1>New Course</h1>
            <form className="register-fields">
                <TextField
                    fullWidth
                    label="Course Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    fullWidth
                    id="standard-multiline-static"
                    multiline
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="For Division"
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <TextField
                    fullWidth
                    id="standard-multiline-static"
                    multiline
                    label="Pre-Requisites"
                    value={preRequisites}
                    onChange={(e) => setPreRequisites(e.target.value)}
                />
                <FormControl fullWidth>
                    <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={net}
                        onChange={(e) => setNet(e.target.value)}
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    />
                </FormControl>
                <Button color="primary" variant="outlined" onClick={Submit}>Add</Button>
            </form>
        </div>
    )
}
