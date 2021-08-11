import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../Config";

export default function Home(props) {
    const [info, setInfo] = useState(["No Data"]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/service/generalinfo`).then((generalinfo) => {
            setInfo(generalinfo.data)
        });
    }, []);

    return (
        <div className="page">
            <h3>Name: {props.adminName}</h3>
            <h3>Email: {props.adminEmail}</h3>
            <h3>Version: {info.tag}</h3>
            <h3>Total Centers : {info.totalCenters}</h3>
            <h3>Total Courses: {info.totalCourses}</h3>
            <h3>Total Employees: {info.totalEmployees}</h3>
            <h3>Total Students: {info.totalStudents}</h3>
            <h3>Total Enquiries: {info.totalEnquiries}</h3>
            <h3>Pending Enquiries: {info.pendingEnquiries}</h3>
            <h3>Archived Enquiries: {info.archivedEnquiries}</h3>
            
        </div>
    )
}
