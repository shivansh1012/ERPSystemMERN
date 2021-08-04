import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiBaseURL } from "../../../Config";
import { DataGrid } from "@material-ui/data-grid"
import Alert from '@material-ui/lab/Alert';

const columns = [
    { field: "id", headerName: "ID" },
    { field: 'name', headerName: 'Name', width: 200, editable: true },
    { field: 'enquiry', headerName: 'Enquiry', width: 200 },
    {
        field: 'status',
        headerName: 'Status',
        type: "singleSelect",
        valueOptions: ['Pending', 'Follow Back', 'Interested', 'Not Interested'],
        width: 200,
        editable: true,
    },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'mobile', headerName: 'Mobile', width: 200 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'city', headerName: 'City', width: 200 },
    { field: 'state', headerName: 'State', width: 200 },
    { field: 'country', headerName: 'Country', width: 200 },
]

export default function EnquiryList() {
    const [enquiries, setEnquiries] = useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState({});


    useEffect(() => {
        axios.get(`${apiBaseURL}/service/enquiry`).then((enquiriesList) => {
            console.log(enquiriesList)
            setEnquiries(enquiriesList.data)
        });
    }, []);

    const handleEditRowsModelChange = React.useCallback((model) => {
        console.log("Change")
        setEditRowsModel(model);
    }, []);

    return (
        <div className="page">
            <Alert severity="info" style={{ marginBottom: 8 }}>
                <code>editRowsModel: {JSON.stringify(editRowsModel)}</code>
            </Alert>
            <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                    rows={enquiries}
                    columns={columns}
                    pageSize={20}
                    hideFooterPagination
                    loading={enquiries.length === 0}
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}
                />
            </div>
        </div>
    )
}
 // onCellEditCommit={(GridEditCellPropsParams, MouseEvent) => {
                    //     console.log("Function Call Success")
                    //     console.log(GridEditCellPropsParams)
                    //     // console.log(MouseEvent)
                    // }}
                    // onError={(err) => {
                    //     console.log(err);
                    // }}
