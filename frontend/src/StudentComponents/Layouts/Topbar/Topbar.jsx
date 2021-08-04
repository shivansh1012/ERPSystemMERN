import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import StudentAuthContext from "../../StudentAuthContext"
import { apiBaseURL } from "../../../Config";
import "./topbar.css";
import { PowerSettingsNew } from "@material-ui/icons";

export default function Topbar() {
    const { getStudentLoggedIn } = useContext(StudentAuthContext);

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
                    <div className="topbarIconContainer" onClick={logout}>
                        <PowerSettingsNew />
                    </div>
                </div>
            </div>
        </div>
    )
}
