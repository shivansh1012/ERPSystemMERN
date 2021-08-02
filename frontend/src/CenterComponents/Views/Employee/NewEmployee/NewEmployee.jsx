import React, { useState } from 'react';
import "./newEmployee.css";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { apiBaseURL } from "../../../../Config"

export default function NewEmployee() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')

    async function Submit(e) {
        e.preventDefault();
        var FormData = {
            name: name,
            email: email,
            password: password,
            contactMobile: mobile,
            address: address,
        }
        axios
            .post(`${apiBaseURL}/center/employee`, FormData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                alert("Employee Added")
            })
            .catch((err) => {
                console.log(err);
                alert("Error")
            });
    }

    return (
        <div className="form page">
            <h1>New Employee</h1>
            <form className="register-fields">
                <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Login Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Assign Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Contact Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <Button color="primary" variant="outlined" onClick={Submit}>Add</Button>
            </form>
        </div>
    )
}
