import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../Config.js";

import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function BatchList() {
    const [batches, setBatches] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/student/batch`).then((batchList) => setBatches(batchList.data));
    }, []);

    return (
        <div className="page">
            <h1 style={{ textAlign: "center" }}>Batch List</h1>
            <div style={{ width: '100%', height: '100%' }}>
                <div
                    id="myGrid"
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                    className="ag-theme-alpine">
                    <AgGridReact
                        rowData={batches}
                        defaultColDef={{
                            flex: 1,
                            minWidth: 130,
                            resizable: true,
                        }}
                    // onGridReady={onGridReady}
                    >

                        <AgGridColumn field="uid" headerName="UID" />
                        <AgGridColumn field="name" />
                        <AgGridColumn field="course" />
                        <AgGridColumn field="faculty" />

                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}