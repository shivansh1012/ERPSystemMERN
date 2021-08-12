import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from "axios";
import { apiBaseURL } from "../../Config.js"

import "./indexPage.css";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    }
}));

function initBasic() {
    const FormData = {
        "email": "admin1@gmail.com",
        "password": "admin1234"
    }
    axios.post(`${apiBaseURL}/admin/register`, FormData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            alert("Initilized Admin")
        })
        .catch((err) => {
            console.log(err);
            alert("Error")
        });

    axios.post(`${apiBaseURL}/service/generalInfo`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            alert("Initilized General INfo")
        })
        .catch((err) => {
            console.log(err);
            alert("Error")
        });
}

export default function IndexPage() {
    const classes = useStyles();
    return (
        <div className="start">
            <h1>Management Portal</h1>
            <div className="positions">
                <Button variant="outlined" size="large" color="primary" className={classes.margin} component={Link} to="/enquiryform">
                    Enquiry Form
                </Button>
            </div>
            <div className="positions">
                <Button variant="outlined" size="large" color="primary" className={classes.margin} component={Link} to="/student">
                    Student
                </Button>
                <Button variant="outlined" size="large" color="primary" className={classes.margin} component={Link} to="/center">
                    Center
                </Button>
                <Button variant="outlined" size="large" color="primary" className={classes.margin} component={Link} to="/admin">
                    Admin
                </Button>
            </div>
            <div className="positions">
                <Button variant="outlined" size="large" color="primary" className={classes.margin} onClick={initBasic}>
                    First Time?
                </Button>
            </div>
        </div>
    )
}
