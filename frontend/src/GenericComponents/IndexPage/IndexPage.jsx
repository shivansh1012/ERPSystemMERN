import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import "./indexPage.css";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    }
}));

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
                <Button variant="outlined" size="large" color="primary" className={classes.margin} component={Link} to="/init">
                    Click if Running First Time on new Machine
                </Button>
            </div>
            
        </div>
    )
}
