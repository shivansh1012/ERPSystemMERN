import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import CenterAuthContext from "../../CenterAuthContext"
import { apiBaseURL } from "../../../Config";
import "./topbar.css";
import { PowerSettingsNew} from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';


export default function Topbar() {
    const { getCenterLoggedIn, employeeName, centerName } = useContext(CenterAuthContext);

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
                    <div style={{ margin: "20px" }}>{employeeName}</div>
                    <div style={{ margin: "20px" }}>{centerName}</div>
                    <div style={{ margin: "20px" }} className="topbarIconContainer" onClick={()=>history.push("/")}>
                        <HomeIcon />
                    </div>
                    <div style={{ margin: "20px" }} className="topbarIconContainer" onClick={logout}>
                        <PowerSettingsNew />
                    </div>
                </div>
            </div>
        </div>
    )
}
