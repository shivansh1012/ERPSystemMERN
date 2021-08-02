import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import AdminAuthContext from "../../AdminAuthContext"
import { apiBaseURL } from "../../../Config";
import "./topbar.css";
import { PowerSettingsNew } from "@material-ui/icons";

export default function Topbar() {
    const { getAdminLoggedIn } = useContext(AdminAuthContext);

    const history = useHistory();
    
    async function logout() {
        await axios.get(`${apiBaseURL}/admin/logout`);
        await getAdminLoggedIn();
        history.push("/admin");
      }
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">ADMIN Management Portal</span>
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
