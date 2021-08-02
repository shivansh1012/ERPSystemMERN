import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../Config";
import "./enquiryList.css";
import { DataGrid } from "@material-ui/data-grid"

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' , width: 200},
    { field: 'enquiry', headerName: 'Enquiry' , width: 200},
    { field: 'email', headerName: 'Email' , width: 200},
    { field: 'mobile', headerName: 'Mobile' , width: 200},
    { field: 'address', headerName: 'Address' , width: 200},
    { field: 'city', headerName: 'City' , width: 200},
    { field: 'state', headerName: 'State' , width: 200},
    { field: 'country', headerName: 'Country' , width: 200},
]

export default function EnquiryList() {
    const [enquiries, setEnquiries] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/center/enquiry`).then((enquiriesList) => setEnquiries(enquiriesList.data));
    }, []);

    return (
        <div className="page">
            <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                    rows={enquiries}
                    columns={columns}
                    pageSize={20}
                    disableColumnMenu
                />
            </div>
        </div>
    )
}
