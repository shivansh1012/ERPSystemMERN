import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import CenterAuthContext from "../../CenterAuthContext"
import { apiBaseURL } from "../../../Config";
import "./topbar.css";
import { PowerSettingsNew } from "@material-ui/icons";

export default function Topbar() {
    const { getCenterLoggedIn } = useContext(CenterAuthContext);

    const history = useHistory();
    
    async function logout() {
        await axios.get(`${apiBaseURL}/center/logout`);
        await getCenterLoggedIn();
        history.push("/center");
      }
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">CENTER Management Portal</span>
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
