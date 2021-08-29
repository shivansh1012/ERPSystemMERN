import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../Config";
import { DataGrid } from "@material-ui/data-grid"

const columns = [
    { field: '_id', headerName: 'ID' },
    { field: 'uid', headerName: 'UID' },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'center', headerName: "Center", width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'password', headerName: 'Password', width: 200 },
    { field: 'phone', headerName: 'Mobile', width: 200 },
    { field: 'fee', headerName: 'Fee', width: 200 },
    { field: 'discount', headerName: 'Discount', width: 200 },
    { field: 'netFee', headerName: 'Net Fee', width: 200 },
    { field: 'feePaid', headerName: 'Fee Paid', width: 200 },
    { field: 'feeBalance', headerName: 'Fee Balance', width: 200 },
    { field: 'enrollmentDate', headerName: 'Enrollment Date', width: 200 },
    { field: 'address', headerName: 'Address', width: 200 },
]

export default function StudentList() {
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/service/student`).then((res) => setStudentList(res.data.studentList));
    }, []);

    return (
        <div className="page">
            <h1 style={{ textAlign: "center" }}>Students</h1>
            <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                    getRowId={(studentList) => studentList._id}
                    rows={studentList}
                    columns={columns}
                    pageSize={20}
                    disableColumnMenu
                />
            </div>
        </div>
    )
}
