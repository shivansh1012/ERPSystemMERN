import React, { useState } from 'react';
import "./enquiryForm.css";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { apiBaseURL } from "../../Config.js";

export default function AddCenter() {

    const [name, setName] = useState('')
    const [enquiry, setEnquiry] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')

    async function Submit(e) {
        e.preventDefault();
        if (!name || !enquiry || !email || !mobile || !address || !city || !state || !country) alert("Fill all the fields");
        else {
            var FormData = {
                name: name,
                enquiry: enquiry,
                email: email,
                mobile: mobile,
                address: address,
                city: city,
                state: state,
                country: country,
            }
            axios
                .post(`${apiBaseURL}/service/enquiry`, FormData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    alert("Enquiry Sent")
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error")
                });
        }

    }

    return (
        <div className="form">
            <h1>Enquiry Form</h1>
            <form className="register-fields">
                <TextField
                    fullWidth
                    label="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                /><TextField
                    fullWidth
                    label="Enquiry About"
                    value={enquiry}
                    onChange={(e) => setEnquiry(e.target.value)}
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
                <Button color="primary" variant="outlined" onClick={Submit}>Enquire</Button>
            </form>
        </div>
    )
}
