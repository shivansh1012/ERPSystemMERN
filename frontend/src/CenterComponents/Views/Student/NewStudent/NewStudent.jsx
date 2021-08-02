import React, { useState } from 'react';
import "./newStudent.css";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import {apiBaseURL} from "../../../../Config"

export default function NewStudent() {

    const [centerName, setCenterName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')

    async function Submit(e) {
        e.preventDefault();
        if (!centerName || !email || !mobile || !address || !city || !state || !country) alert("Fill all the fields");
        else {
            var FormData = {
                name: centerName,
                contactEmail: email,
                contactMobile: mobile,
                address: address,
                city: city,
                state: state,
                country: country,
            }
            axios
                .post(`${apiBaseURL}/admin/center/new`, FormData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    alert("Center Added")
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error")
                });
        }

    }

    return (
        <div className="form page">
            <h1>Admission</h1>
            <form className="register-fields">
                <TextField
                    fullWidth
                    label="Full Name"
                    value={centerName}
                    onChange={(e) => setCenterName(e.target.value)}
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
                <TextField
                    fullWidth
                    label="Courses"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Fee"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Discount"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Net Amount"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
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
