import React, { useState } from 'react';
import "./addCourse.css";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, InputLabel, InputAdornment, Input, FormControl } from "@material-ui/core";
import axios from "axios";
import { apiBaseURL } from "../../../../Config"

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function AddCourse() {
    const classes = useStyles();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [division, setDivision] = useState('')
    const [duration, setDuration] = useState('')
    const [preRequisites, setPreRequisites] = useState('')
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)

    async function Submit(e) {
        e.preventDefault();
        var FormData = {
            title: title,
            description: description,
            division: division,
            duration: duration,
            preRequisites: preRequisites,
            price: price,
            discount: discount
        }
        axios
            .post(`${apiBaseURL}/admin/course/new`, FormData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                alert("Course Added")
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
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="standard-adornment-discount">Discount</InputLabel>
                    <Input
                        id="standard-adornment-discount"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        endAdornment={<InputAdornment position="start">%</InputAdornment>}
                    />
                </FormControl>
                <Button color="primary" variant="outlined" onClick={Submit}>Add</Button>
            </form>
        </div>
    )
}
