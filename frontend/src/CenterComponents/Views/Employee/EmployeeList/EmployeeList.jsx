import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../../Config";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import "ag-grid-enterprise"

export default function EmployeeList() {
    // const [gridApi, setGridApi] = useState(null);
    // const [gridColumnApi, setGridColumnApi] = useState(null);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get(`${apiBaseURL}/center/employee`).then((employeeList) => setEmployees(employeeList.data));
    }, []);

    // const onGridReady = (params) => {
    //     console.log(params)
    //     setGridApi(params.api);
    //     setGridColumnApi(params.columnApi);
    // };

    const onCellValueChanged = (params) => {
        console.log(params.data)
        axios.patch(`${apiBaseURL}/service/enquiry`, params.data);
    };

    return (
        <div className="page">
            <h1 style={{textAlign:"center"}}>Employee</h1>
            <Button variant="outlined" size="large" color="primary" style={{margin:"5px"}} component={Link} to="/center/employee/new">
                New Employee
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
                        rowData={employees}
                        defaultColDef={{
                            flex: 1,
                            minWidth: 130,
                            resizable: true,
                        }}
                        // onGridReady={onGridReady}
                        onCellValueChanged={onCellValueChanged}>

                        <AgGridColumn field="id" />
                        <AgGridColumn field="name" />
                        <AgGridColumn field="permissionLevel" />
                        <AgGridColumn field="employeeType" />
                        <AgGridColumn field="email" />
                        <AgGridColumn field="contactMobile" />
                        <AgGridColumn field="address" />
                        <AgGridColumn field="center" />

                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}
