import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../../Config";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

import { DataGrid } from "@material-ui/data-grid";

const columns = [
    { field: '_id', headerName: 'ID' },
    { field: 'uid', headerName: 'UID' },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'employeeType', headerName: 'EmployeeType', width: 200 },
    { field: 'permissionLevel', headerName: 'PermissionLevel', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'password', headerName: 'Password', width: 200 },
    { field: 'contactMobile', headerName: 'ContactMobile', width: 200 },
    { field: 'address', headerName: 'Address', width: 200 },
]

export default function EmployeeList() {
    const [employeeList, setEmployeesList] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/center/employee`).then((res) => setEmployeesList(res.data.employeeList));
    }, []);

    return (
        <div className="page">
            <h1 style={{ textAlign: "center" }}>Employee</h1>
            <Button variant="outlined" size="large" color="primary" style={{ margin: "5px" }} component={Link} to="/center/employee/new">
                New Employee
            </Button>
            <div style={{ width: '100%', height: '100%' }}>
                <DataGrid
                    getRowId={(employeeList) => employeeList._id}
                    rows={employeeList}
                    columns={columns}
                    pageSize={20}
                    disableColumnMenu
                />
            </div>
        </div>
    )
}
