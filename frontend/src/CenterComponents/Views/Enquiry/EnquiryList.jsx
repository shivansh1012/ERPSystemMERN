import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../Config";
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "ag-grid-enterprise"

export default function EnquiryList() {
    // const [gridApi, setGridApi] = useState(null);
    // const [gridColumnApi, setGridColumnApi] = useState(null);
    const [enquiries, setEnquiries] = useState([]);

    // const onGridReady = (params) => {
    //     setGridApi(params.api);
    //     setGridColumnApi(params.columnApi);
    // };

    const onCellValueChanged = (params) => {
        console.log(params.data)
        axios.patch(`${apiBaseURL}/service/enquiry`, params.data);
    };

    useEffect(() => {
        axios.get(`${apiBaseURL}/service/enquiry`).then((enquiriesList) => {
            // console.log(enquiriesList)
            setEnquiries(enquiriesList.data)
        });
    }, []);

    return (
        <div className="page">
            <h1 style={{textAlign:"center"}}>Enquiries</h1>
            <div style={{ width: '100%', height: '100%' }}>
                <div
                    id="myGrid"
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                    className="ag-theme-alpine">
                    <AgGridReact
                        rowData={enquiries}
                        defaultColDef={{
                            flex: 1,
                            minWidth: 130,
                            resizable: true,
                        }}
                        // onGridReady={onGridReady}
                        onCellValueChanged={onCellValueChanged}>

                        {/* <AgGridColumn field="id" /> */}
                        <AgGridColumn field="name" />
                        <AgGridColumn field="enquiry" />
                        <AgGridColumn
                            sort="desc"
                            field="status"
                            editable={true}
                            cellEditor="agRichSelectCellEditor"
                            cellEditorParams={{ cellHeight: 50, values: ['Pending', 'Follow Up', 'Interested', 'Not Interested'] }}
                        />
                        <AgGridColumn field="email" />
                        <AgGridColumn field="mobile" />
                        <AgGridColumn field="address" />
                        <AgGridColumn field="city" />
                        <AgGridColumn field="state" />
                        <AgGridColumn field="country" />

                    </AgGridReact>
                </div>
            </div>
        </div>
    )
}