import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../Config";

import FeaturedInfo from "./Components/FeaturedInfo.jsx"

export default function Home() {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/service/generalinfo`).then((generalinfo) => {
            setInfo(generalinfo.data)
        });
    }, []);

    return (
        <div className="page">
            <FeaturedInfo title1={"Version"} value1={info.tag} title2={"Total Centers"} value2={info.totalCenters}/>
            <FeaturedInfo title1={"Total Students"} value1= {info.totalStudents} title2={"Total Courses"} value2={info.totalCourses} title3={"Total Employees"} value3={info.totalEmployees}/>
            <FeaturedInfo title1={"Total Enquiries"} value1={info.totalEnquiries} title2={"Pending Enquiries"} value2={info.pendingEnquiries} title3={"Archived Enquiries"} value3={info.archivedEnquiries}/>
        </div>
    )
}
