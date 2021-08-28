import React, { useState, useEffect } from 'react';
import axios from "axios";
import { apiBaseURL } from "../../../../Config.js";
import { DataGrid } from "@material-ui/data-grid"

import {
    Button,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
    Container,
} from "@material-ui/core";

const columns = [
    { field: '_id', headerName: 'ID', width: 300 },
    { field: 'uid', headerName: 'UID', width: 300 },
    { field: 'name', headerName: 'Name', width: 300 },
]

export default function AddStudent() {
    const [students, setStudents] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState('')
    const [batch, setBatch] = useState(undefined)

    const [selectionModal, setSelectionModal] = useState([])

    const changeBatch = async (e) => {
        setSelectedBatch(e.target.value)
        setSelectionModal(students.filter((std) => std.batchList.includes(e.target.value)).map((std) => std._id));
        // await axios
        //     .get(`${apiBaseURL}/center/batch/?id=${e.target.value}`)
        //     .then((res) => {

        //     })
        //     .catch((err) => { console.error(err); alert(err); });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedBatch === "") return alert("Select batch first");
        const FormData = {
            selectedStudent: selectedRow
        }
        console.log(FormData)
        axios
            .post(`${apiBaseURL}/center/batch/student/?id=${selectedBatch}`,
                FormData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            .then((res) => {
                alert(res.data.message)
            })
            .catch((err) => { console.error(err); alert(err); });
    };

    const getBatchDetails = async () => {
        await axios
            .get(`${apiBaseURL}/center/batch`)
            .then((batchList) => setBatch(batchList.data))
            .catch((err) => { console.error(err); alert(err); });
    }

    const getStudentDetails = async () => {
        await axios
            .get(`${apiBaseURL}/center/student`)
            .then((studentList) => setStudents(studentList.data))
            .catch((err) => { console.error(err); alert(err); });
    }

    useEffect(() => {
        getBatchDetails();
        getStudentDetails();
    }, [])


    return (
        <Container>
            <h1 style={{ textAlign: "center" }}>Update Students in Batch</h1>
            <form onSubmit={handleSubmit}>
                <FormControl style={{ display: "flex", width: "480px", flexDirection: "column" }}>
                    <InputLabel id="batch-select">Select Batch</InputLabel>
                    <Select
                        labelId="batch-select"
                        id="batch-select"
                        value={selectedBatch}
                        onChange={changeBatch}>
                        {batch !== undefined && batch.map((bat) => (
                            <MenuItem key={bat._id} value={bat._id}>{bat.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(students) => students._id}
                        rows={students}
                        columns={columns}
                        pageSize={100}
                        disableColumnMenu
                        checkboxSelection
                        hideFooterPagination
                        onSelectionModelChange={(newSelectionModel) => {
                            setSelectedRow(newSelectionModel);
                        }}
                        selectionModel={selectionModal}
                    />
                </div>

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                >Save</Button>
            </form>
        </Container>
    );
}
