import React from 'react'
import axios from "axios";
import { apiBaseURL } from "../Config.js"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    }
}));

export default function InitPortal() {
    const classes = useStyles();

    const email = "admin1@gmail.com";
    const password = "admin1234";
    function initBasic() {
        const FormData = {
            email,
            password
        }
        axios.post(`${apiBaseURL}/admin/register`, FormData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                alert(`admin initialization : ${res.data.message}`)
            })
            .catch((err) => {
                console.log(err);
                alert("Admin Already Initilized")
            });

        axios.post(`${apiBaseURL}/service/generalInfo`, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                alert(`generalInfo initialization :  ${res.data.message}`)
            })
            .catch((err) => {
                console.log(err);
                alert("Error")
            });
    }

    return (
        <div>
            <div className="positions">
                <Button variant="outlined" size="large" color="primary" className={classes.margin} onClick={initBasic}>
                    Init Resources
                </Button>
            </div>
            <h1>Admin Email = {email}</h1>
            <h1>Admin Password = {password}</h1>
        </div>
    )
}
