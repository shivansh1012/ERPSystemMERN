import React, { useState, useEffect } from 'react';
import axios from "axios";
import { apiBaseURL } from "../../../../Config"

import {
    TextField,
    Button,
    InputLabel,
    InputAdornment,
    Input,
    FormControl,
    MenuItem,
    Select
} from "@material-ui/core";

import "./newStudent.css";

export default function NewStudent() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [course, setCourse] = useState(undefined)
    const [selectedCourse, setSelectedCourse] = useState('')
    const [fee, setFee] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [netFee, setNetFee] = useState(0);
    const [paymentType, setPaymentType] = useState("full");
    const [feePaid, setFeePaid] = useState(0);
    const [feeBalance, setFeeBalance] = useState(0);
    const [address, setAddress] = useState('')

    async function Submit(e) {
        e.preventDefault();
        var FormData = {
            name: name,
            email: email + "@gmail.com",
            phone: mobile,
            enrolledCourse: selectedCourse,
            fee,
            discount,
            netFee,
            paymentType,
            feePaid,
            feeBalance,
            address: address,
        }
        axios
            .post(`${apiBaseURL}/center/student`, FormData, {
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
                setFee(course[dict]["price"])
                setNetFee(course[dict]["price"] - course[dict]["price"] * discount / 100)
                setFeeBalance(course[dict]["price"] - course[dict]["price"] * discount / 100 - feePaid);
                break
            }
        }
    }

    function calcNet(e) {
        setDiscount(e.target.value)
        setNetFee(fee - fee * e.target.value / 100)
        setFeeBalance((netFee - fee * e.target.value / 100) - feePaid);
    }

    function handleFeePayment(e) {
        setFeePaid(e.target.value);
        setFeeBalance(netFee - e.target.value);
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

                <FormControl fullWidth>
                    <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        disabled={true}
                        value={fee}
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="standard-adornment-discount">Discount</InputLabel>
                    <Input
                        id="standard-adornment-discount"
                        value={discount}
                        onChange={calcNet}
                        endAdornment={<InputAdornment position="start">%</InputAdornment>}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="standard-adornment-netamount">Net Amount</InputLabel>
                    <Input
                        id="standard-adornment-netamount"
                        disabled={true}
                        value={netFee}
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel id="payment-select">Payment Type</InputLabel>
                    <Select
                        labelId="payment-select"
                        id="payment-select"
                        value={paymentType}
                        onChange={(e) => setPaymentType(e.target.value)}
                    >
                        <MenuItem key={1} value={"full"}>Full</MenuItem>
                        <MenuItem key={2} value={"installment"}>Installment</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="standard-adornment-fee-paid">Fee Paid Now</InputLabel>
                    <Input
                        id="standard-adornment-fee-paid"
                        value={feePaid}
                        onChange={handleFeePayment}
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="standard-adornment-fee-balance">Balance Fee</InputLabel>
                    <Input
                        id="standard-adornment-balance"
                        disabled={true}
                        value={feeBalance}
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    />
                </FormControl>
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
