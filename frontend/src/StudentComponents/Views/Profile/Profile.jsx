import React, { useState, useEffect } from 'react';
import axios from "axios";
import { apiBaseURL } from "../../../Config.js";

export default function Profile() {
    const [info, sefInfo] = useState({});

    const getProfileInfo = async () => {
        await axios
        .get(`${apiBaseURL}/student/profile`)
        .then((res) => {
            sefInfo(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.error(err);
            alert(err)
        })
    }

    useEffect(() => {
        getProfileInfo();
    }, [])

    return (
        <div className="page">
            <h1 style={{textAlign:"center"}}>Profile</h1>
            <h3>ID : {info.uid}</h3>
            <h3>Name : {info.name}</h3>
            <h3>Email : {info.email}</h3>
            <h3>Password : {info.password}</h3>
            <h3>Phone : {info.phone}</h3>
            <h3>Enrollment Date : {info.enrollmentDate}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Enrolled Course :</th>
                    </tr>
                </thead>
                <tbody>
                    {info.enrolledCourse && info.enrolledCourse.map(course =>
                        <tr key={course}>
                            <td>{course}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>Batch</th>
                    </tr>
                </thead>
                <tbody>
                    {info.batchList && info.batchList.map(batch =>
                        <tr key={batch}>
                            <td>{batch}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <h3>Net Fee : {info.netFee}</h3>
            <h3>Fee Paid : {info.feePaid}</h3>
            <h3>Fee Balance : {info.feeBalance}</h3>
        </div>
    )
}
