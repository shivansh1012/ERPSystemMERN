import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../../Config.js";
import { DataGrid } from "@material-ui/data-grid"
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Title' , width: 200},
    { field: 'description', headerName: 'Description' , width: 200},
    // { field: 'division', headerName: 'Division' , width: 200},
    { field: 'duration', headerName: 'Duration' , width: 200},
    { field: 'preRequisites', headerName: 'PreRequisites' , width: 200},
    { field: 'price', headerName: 'Price' , width: 200},
    // { field: 'discount', headerName: 'Discount' , width: 200},
    { field: "update", headerName: 'Update' , width: 200}
]


export default function ViewCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/service/course`).then((courseList) => setCourses(courseList.data));
    }, []);

    return (
        <div className="page">
            <h1 style={{textAlign:"center"}}>Course List</h1>
            <Button variant="outlined" size="large" color="primary" style={{margin:"5px"}} component={Link} to="/admin/course/new">
                New Course
            </Button>
            <Button variant="outlined" size="large" color="primary" style={{margin:"5px"}} component={Link} to="/admin/course/chapters">
                Update Chapters
            </Button>
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
