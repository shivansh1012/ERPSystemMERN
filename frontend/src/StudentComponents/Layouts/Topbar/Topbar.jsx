import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import StudentAuthContext from "../../StudentAuthContext"
import { apiBaseURL } from "../../../Config";
import "./topbar.css";
import { PowerSettingsNew } from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';

export default function Topbar() {
    const { studentEmail, studentCenter, getStudentLoggedIn } = useContext(StudentAuthContext);

    const history = useHistory();

    async function logout() {
        await axios.get(`${apiBaseURL}/student/logout`);
        await getStudentLoggedIn();
        history.push("/student");
    }
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">STUDENT Management Portal</span>
                </div>
                <div className="topRight">
                    <div style={{ margin: "20px" }}>{studentEmail}</div>
                    <div style={{ margin: "20px" }}>{studentCenter}</div>
                    <div style={{ margin: "20px" }} className="topbarIconContainer" onClick={() => history.push("/")}>
                        <HomeIcon />
                    </div>
                    <div className="topbarIconContainer" onClick={logout}>
                        <PowerSettingsNew />
                    </div>
                </div>
            </div>
        </div>
    )
}
