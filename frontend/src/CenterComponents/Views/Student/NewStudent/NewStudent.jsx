import React, { useState, useEffect } from 'react';
import "./newStudent.css";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { apiBaseURL } from "../../../../Config"

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function NewStudent() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [course, setCourse] = useState(undefined)
    const [selectedCourse, setSelectedCourse] = useState('')
    const [price, setPrice] = useState(0);
    const [fee, setFee] = useState(0);
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
            fee: fee,
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

                <TextField
                    fullWidth
                    disabled={true}
                    label="Fee"
                    value={price}
                />
                <TextField
                    fullWidth
                    label="Discount"
                    value={discount}
                    onChange={calcNet}
                />
                <TextField
                    fullWidth
                    label="Net Amount"
                    disabled={true}
                    value={net}
                />
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
