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
    const [studentList, setStudentList] = useState([]);
    const [batchList, setBatchList] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState('');

    const [selectionModal, setSelectionModal] = useState([])

    const changeBatch = async (e) => {
        setSelectedBatch(e.target.value)
        setSelectionModal(studentList.filter((std) => std.batchList.includes(e.target.value)).map((std) => std._id));
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
            .then((res) => setBatchList(res.data.batchList))
            .catch((err) => { console.error(err); alert(err); });
    }

    const getStudentDetails = async () => {
        await axios
            .get(`${apiBaseURL}/center/student`)
            .then((res) => setStudentList(res.data.studentList))
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
                        {batchList !== undefined && batchList.map((batch) => (
                            <MenuItem key={batch._id} value={batch._id}>{batch.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(studentList) => studentList._id}
                        rows={studentList}
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
