import React from 'react';
import "./sidebar.css";
import {
    LineStyle,
    Timeline,
    PermIdentity,
    MailOutline,
    WorkOutline,
    Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/center" className="link">
                            <li className="sidebarListItem">
                                <LineStyle className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Employees</h3>
                    <ul className="sidebarList">
                        <Link to="/center/employee" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                List Employees
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Student</h3>
                    <ul className="sidebarList">
                        <Link to="/center/student" className="link">
                            <li className="sidebarListItem">
                                <MailOutline className="sidebarIcon" />
                                List Students
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <Link to="/center/enquiry" className="link">
                            <li className="sidebarListItem">
                                <Report className="sidebarIcon" />
                                Enquiries
                            </li>
                        </Link>
                        <Link to="/center/analytics" className="link">
                            <li className="sidebarListItem">
                                <Timeline className="sidebarIcon" />
                                Analytics
                            </li>
                        </Link>
                        <Link to="/center/report" className="link">
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
