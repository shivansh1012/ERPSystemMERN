import React from 'react';
import "./sidebar.css";
import {
    LineStyle,
    Timeline,
    DynamicFeed,
    Assessment,
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
                        <Link to="/admin" className="link">
                            <li className="sidebarListItem">
                                <LineStyle className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Center</h3>
                    <ul className="sidebarList">
                        <Link to="/admin/center" className="link">
                            <li className="sidebarListItem">
                                <Assessment className="sidebarIcon" />
                                Center Report
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Course</h3>
                    <ul className="sidebarList">
                        <Link to="/admin/course" className="link">
                            <li className="sidebarListItem">
                                <DynamicFeed className="sidebarIcon" />
                                View Courses
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <Link to="/admin/manage" className="link">
                            <li className="sidebarListItem">
                                <WorkOutline className="sidebarIcon" />
                                Manage
                            </li>
                        </Link>
                        <Link to="/admin/analytics" className="link">
                            <li className="sidebarListItem">
                                <Timeline className="sidebarIcon" />
                                Analytics
                            </li>
                        </Link>
                        <Link to="/admin/report" className="link">
                            <li className="sidebarListItem">
                                <Report className="sidebarIcon" />
                                Reports
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}
