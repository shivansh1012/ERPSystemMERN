import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../Config";
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import "ag-grid-enterprise"

export default function EnquiryList() {
    const [enquiries, setEnquiries] = useState([]);

    const onCellValueChanged = (params) => {
        const data = {
            _id: params.data._id,
            oldValue: params.oldValue,
            newValue: params.newValue,
        }
        axios.patch(`${apiBaseURL}/service/enquiry`, data);
    };

    const getEnquiryList = async () => {
        await axios
            .get(`${apiBaseURL}/service/enquiry`)
            .then((enquiriesList) => {
                setEnquiries(enquiriesList.data)
            });
    }

    useEffect(() => {
        getEnquiryList();
    }, []);

    return (
        <div className="page">
            <h1 style={{ textAlign: "center" }}>Enquiries <br />(ag-grid-enterprise is commented on line 7) Uncomment it</h1>
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
                        onCellValueChanged={onCellValueChanged}>

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