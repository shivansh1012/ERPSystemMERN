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
    { field: 'course', headerName: 'Course', width: 200 },
    { field: 'studentCount', headerName: 'StudentCount', width: 200 },
    { field: 'faculty', headerName: 'Faculty', width: 200 },
]

export default function BatchList() {
    const [batchList, setBatchList] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/center/batch`).then((res) => setBatchList(res.data.batchList));
    }, []);

    return (
        <div className="page">
            <h1 style={{ textAlign: "center" }}>Batches</h1>
            <Button variant="outlined" size="large" color="primary" style={{ margin: "5px" }} component={Link} to="/center/batch/new">
                New Batch
            </Button>
            <Button variant="outlined" size="large" color="primary" style={{ margin: "5px" }} component={Link} to="/center/batch/student">
                Add Student
            </Button>
            <div style={{ width: '100%', height: '100%' }}>
                <DataGrid
                    getRowId={(batchList) => batchList._id}
                    rows={batchList}
                    columns={columns}
                    pageSize={20}
                    disableColumnMenu
                />
            </div>
        </div>
    )
}
