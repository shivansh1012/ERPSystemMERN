import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../Config";

export default function Home() {
    const [info, setInfo] = useState(["No Data"]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/center/generalinfo`).then((generalinfo) => {
            setInfo(generalinfo.data)
        });
    }, []);

    return (
        <div className="page">
            <h3>Version: {info.tag}</h3>
            <h3>Total Enquiries: {info.totalEnquiries}</h3>
            <h3>Pending Enquiries: {info.pendingEnquiries}</h3>
            <h3>Archived Enquiries: {info.archivedEnquiries}</h3>
            
        </div>
    )
}
