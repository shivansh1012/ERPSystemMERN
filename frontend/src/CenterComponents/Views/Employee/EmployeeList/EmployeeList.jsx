import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../../Config";
// import "./enquiryList.css";
import { DataGrid } from "@material-ui/data-grid"

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' , width: 200},
    { field: 'email', headerName: 'Email' , width: 200},
    { field: 'contactMobile', headerName: 'Mobile' , width: 200},
    { field: 'address', headerName: 'Address' , width: 200},
    { field: 'center', headerName: 'Center' , width: 200},
]

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/center/employee`).then((employeeList) => setEmployees(employeeList.data));
    }, []);

    return (
        <div className="page">
            <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                    rows={employees}
                    columns={columns}
                    pageSize={20}
                    disableColumnMenu
                />
            </div>
        </div>
    )
}
