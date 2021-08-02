import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../../Config.js";
import { DataGrid } from "@material-ui/data-grid"

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' , width: 200},
    { field: 'contactEmail', headerName: 'Contact Email' , width: 200},
    { field: 'contactMobile', headerName: 'Contact Mobile' , width: 200},
    { field: 'address', headerName: 'Address' , width: 200},
    { field: 'city', headerName: 'City' , width: 200},
    { field: 'state', headerName: 'State' , width: 200},
    { field: 'enrolledStudents', headerName: 'Students' , width: 200},
    { field: 'totalEmployees', headerName: 'Employees' , width: 200},
]

export default function CenterReport() {
    const [centers, setCenters] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/admin/center`).then((centerList) => setCenters(centerList.data));
    }, []);

    return (
        <div className="page">
            <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                    rows={centers}
                    columns={columns}
                    pageSize={20}
                    disableColumnMenu
                />
            </div>
        </div>
    )
}
