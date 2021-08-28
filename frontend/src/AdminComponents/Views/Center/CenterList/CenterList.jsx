import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../../Config.js";
import { DataGrid } from "@material-ui/data-grid"
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const columns = [
    { field: 'uid', headerName: 'UID' },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'contactEmail', headerName: 'Contact Email', width: 200 },
    { field: 'contactMobile', headerName: 'Contact Mobile', width: 200 },
    { field: 'adminLogin', headerName: 'Center Admin Login ID', width: 200 },
    { field: 'adminPassword', headerName: 'Center Admin Login Password', width: 250 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'city', headerName: 'City', width: 200 },
    { field: 'state', headerName: 'State', width: 200 },
    { field: 'enrolledStudents', headerName: 'Students', width: 200 },
    { field: 'totalEmployees', headerName: 'Employees', width: 200 },
]

export default function CenterList() {
    const [centerList, setCenterList] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/service/center`).then((res) => setCenterList(res.data.centerList));
    }, []);

    return (
        <div className="page">
            <h1 style={{ textAlign: "center" }}>Center List</h1>
            <Button variant="outlined" size="large" color="primary" style={{ margin: "5px" }} component={Link} to="/admin/center/new">
                New Center
            </Button>
            <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                    getRowId={(centerList) => centerList._id}
                    rows={centerList}
                    columns={columns}
                    pageSize={20}
                    disableColumnMenu
                />
            </div>
        </div>
    )
}
