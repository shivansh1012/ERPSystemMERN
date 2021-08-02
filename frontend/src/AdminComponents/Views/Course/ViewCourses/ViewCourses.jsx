import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../../Config.js";
import { DataGrid } from "@material-ui/data-grid"

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Title' , width: 200},
    { field: 'description', headerName: 'Description' , width: 200},
    { field: 'division', headerName: 'Division' , width: 200},
    { field: 'duration', headerName: 'Duration' , width: 200},
    { field: 'preRequisites', headerName: 'PreRequisites' , width: 200},
    { field: 'price', headerName: 'Price' , width: 200},
    { field: 'discount', headerName: 'Discount' , width: 200},
]


export default function ViewCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/admin/course`).then((courseList) => setCourses(courseList.data));
    }, []);

    return (
        <div className="page">
            <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                    rows={courses}
                    columns={columns}
                    pageSize={20}
                    disableColumnMenu
                />
            </div>
        </div>
    )
}
