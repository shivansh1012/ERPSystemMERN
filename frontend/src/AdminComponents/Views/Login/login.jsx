import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import AdminAuthContext from "../../AdminAuthContext";
import { apiBaseURL } from "../../../Config";

import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Typography,
    Container
} from '@material-ui/core';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getAdminLoggedIn } = useContext(AdminAuthContext);
    const history = useHistory();

    async function login(e) {
        e.preventDefault();
        const loginData = {
            email,
            password
        }

        axios.post(`${apiBaseURL}/admin/login`, loginData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                console.log(res)
                await getAdminLoggedIn();
                history.push("/admin");
            })
            .catch((err) => {
                console.error(err);
                alert("Error")
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Owner Sign in
                </Typography>
                <form className={classes.form} onSubmit={login}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    )
}
