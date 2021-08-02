import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../../Config";
import { DataGrid } from "@material-ui/data-grid"

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' , width: 200},
    { field: 'email', headerName: 'Email' , width: 200},
    { field: 'contactMobile', headerName: 'Mobile' , width: 200},
    { field: 'address', headerName: 'Address' , width: 200},
    { field: 'center', headerName: 'Center' , width: 200},
]

export default function StudentList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/center/student`).then((studentList) => setStudents(studentList.data));
    }, []);

    return (
        <div className="page">
            <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                    rows={students}
                    columns={columns}
                    pageSize={20}
                    disableColumnMenu
                />
            </div>
        </div>
    )
}
