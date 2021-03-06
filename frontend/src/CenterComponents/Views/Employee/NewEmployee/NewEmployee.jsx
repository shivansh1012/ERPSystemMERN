import React, { useState } from 'react';
import axios from "axios";
import { apiBaseURL } from "../../../../Config"

import {
    TextField,
    Button,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    InputAdornment,
    Input,
} from "@material-ui/core";

import "./newEmployee.css";

export default function NewEmployee() {
    const [name, setName] = useState('')
    const [employeeType, setEmployeeType] = useState('')
    const [permissionLevel, setPermissionLevel] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')

    async function Submit(e) {
        e.preventDefault();
        var FormData = {
            name: name,
            employeeType: employeeType,
            permissionLevel: permissionLevel,
            email: email + "@gmail.com",
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
                alert(res.data.message)
            })
            .catch((err) => {
                console.log(err);
                alert("Error")
            });
    }

    const setEmployeeLevel = (e) => {
        setPermissionLevel(e.target.value);
        if (e.target.value === 1) setEmployeeType("Dean")
        else if (e.target.value === 2) setEmployeeType("Coordinator")
        else if (e.target.value === 3) setEmployeeType("Staff")
        else setEmployeeType("Faculty")
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
                <FormControl>
                    <InputLabel id="employee-type">Employee Type</InputLabel>
                    <Select
                        labelId="employee-type"
                        id="employee-type"
                        value={permissionLevel}
                        onChange={setEmployeeLevel}
                    >
                        <MenuItem value={1}>Dean</MenuItem>
                        <MenuItem value={2}>Coordinator</MenuItem>
                        <MenuItem value={3}>Staff</MenuItem>
                        <MenuItem value={4}>Faculty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
                    <Input
                        id="standard-adornment-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        endAdornment={<InputAdornment position="end">@gmail.com</InputAdornment>}
                    />
                </FormControl>
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
