import React from 'react';
import "./sidebar.css";
import {
    LineStyle,
    Timeline,
    PermIdentity,
    MailOutline,
    WorkOutline,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/student" className="link">
                            <li className="sidebarListItem">
                                <LineStyle className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Batch</h3>
                    <ul className="sidebarList">
                        <Link to="/student/batch" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                My Batches
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Fee</h3>
                    <ul className="sidebarList">
                        <Link to="/student/fee" className="link">
                            <li className="sidebarListItem">
                                <MailOutline className="sidebarIcon" />
                                Fee Status
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Misc</h3>
                    <ul className="sidebarList">
                        <Link to="/student/analytics" className="link">
                            <li className="sidebarListItem">
                                <Timeline className="sidebarIcon" />
                                Analytics
                            </li>
                        </Link>
                        <Link to="/student/report" className="link">
                            <li className="sidebarListItem">
                                <WorkOutline className="sidebarIcon" />
                                Reports
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}
