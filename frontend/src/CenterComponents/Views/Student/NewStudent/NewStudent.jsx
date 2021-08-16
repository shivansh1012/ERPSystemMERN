import React, { useState, useEffect } from 'react';
import "./newStudent.css";
import axios from "axios";
import { apiBaseURL } from "../../../../Config"

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, InputLabel, InputAdornment, Input, FormControl } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function NewStudent() {
    const classes = useStyles();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [course, setCourse] = useState(undefined)
    const [selectedCourse, setSelectedCourse] = useState('')
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [net, setNet] = useState(0);
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')

    async function Submit(e) {
        e.preventDefault();
        var FormData = {
            name: name,
            email: email,
            mobile: mobile,
            course: selectedCourse,
            discount: discount,
            net: net,
            address: address,
            city: city,
            state: state,
            country: country,
        }
        axios
            .post(`${apiBaseURL}/center/student`, FormData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                alert("Student Added")
            })
            .catch((err) => {
                console.log(err);
                alert("Error")
            });

    }

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

    function changeCourse(e) {
        setSelectedCourse(e.target.value)
        for (let dict in course) {
            if (course[dict]["_id"] === e.target.value) {
                setPrice(course[dict]["price"])
                setNet(course[dict]["price"] - course[dict]["price"] * discount / 100)
                break
            }
        }
    }

    function calcNet(e) {
        setDiscount(e.target.value)
        setNet(price - price * e.target.value / 100)
    }

    useEffect(() => {
        getCourseDetails();
    }, [])

    return (
        <div className="form page">
            <h1>Admission</h1>
            <form className="register-fields">
                <TextField
                    fullWidth
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />

                <FormControl>
                    <InputLabel id="course-select">Select Course</InputLabel>
                    <Select
                        labelId="course-select"
                        id="course-select"
                        value={selectedCourse}
                        onChange={changeCourse}
                    >
                        {course !== undefined && course.map((cour) => (
                            <MenuItem key={cour._id} value={cour._id}>{cour.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        disabled={true}
                        value={price}
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="standard-adornment-discount">Discount</InputLabel>
                    <Input
                        id="standard-adornment-discount"
                        value={discount}
                        onChange={calcNet}
                        endAdornment={<InputAdornment position="start">%</InputAdornment>}
                    />
                </FormControl>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="standard-adornment-amount">Net Amount</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        disabled={true}
                        value={net}
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    />
                </FormControl>
                <TextField
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <Button color="primary" variant="outlined" onClick={Submit}>Add</Button>
            </form>
        </div>
    )
}
