import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../Config";

import FeaturedInfo from "./Components/FeaturedInfo.jsx"

export default function Home() {
    const [info, setInfo] = useState(["No Data"]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/service/generalinfo`).then((generalinfo) => {
            setInfo(generalinfo.data)
        });
    }, []);

    return (
        <div className="page">
            <h1 style={{textAlign:"center"}}>Home</h1>
            <h3 style={{textAlign:"center"}}>Version: {info.tag}</h3>
            <FeaturedInfo title1={"Total Enquiries"} value1={info.totalEnquiries} title2={"Pending Enquiries"} value2={info.pendingEnquiries} title3={"Archived Enquiries"} value3={info.archivedEnquiries}/>
        </div>
    )
}
