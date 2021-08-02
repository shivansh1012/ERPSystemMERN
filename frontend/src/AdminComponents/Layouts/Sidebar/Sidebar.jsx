import React from 'react';
import "./sidebar.css";
import {
    LineStyle,
    Timeline,
    LibraryBooks,
    BusinessCenter,
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
                        <Link to="/admin/centers" className="link">
                            <li className="sidebarListItem">
                                <Assessment className="sidebarIcon" />
                                Center Report
                            </li>
                        </Link>
                        <Link to="/admin/center/new" className="link">
                            <li className="sidebarListItem">
                                <BusinessCenter className="sidebarIcon" />
                                New Center
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Course</h3>
                    <ul className="sidebarList">
                        <Link to="/admin/courses" className="link">
                            <li className="sidebarListItem">
                                <DynamicFeed className="sidebarIcon" />
                                View Courses
                            </li>
                        </Link>
                        <Link to="/admin/course/new" className="link">
                            <li className="sidebarListItem">
                                <LibraryBooks className="sidebarIcon" />
                                New Course
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Staff</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <WorkOutline className="sidebarIcon" />
                            Manage
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <Report className="sidebarIcon" />
                            Reports
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
