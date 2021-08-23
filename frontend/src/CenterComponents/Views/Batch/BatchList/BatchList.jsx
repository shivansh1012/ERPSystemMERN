import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../../Config";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export default function BatchList() {
    // const [gridApi, setGridApi] = useState(null);
    // const [gridColumnApi, setGridColumnApi] = useState(null);
    const [batches, setBatches] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/center/batch`).then((batchList) => setBatches(batchList.data));
    }, []);

    // const onGridReady = (params) => {
    //     console.log(params)
    //     setGridApi(params.api);
    //     setGridColumnApi(params.columnApi);
    // };

    return (
        <div className="page">
            <h1 style={{textAlign:"center"}}>Batches</h1>
            <Button variant="outlined" size="large" color="primary" style={{margin:"5px"}} component={Link} to="/center/batch/new">
                New Batch
            </Button>
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

                        <AgGridColumn field="id" />
                        <AgGridColumn field="name" />
                        <AgGridColumn field="subjects" />
                        <AgGridColumn field="studentCount" />
                        <AgGridColumn field="faculty" />

                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}
