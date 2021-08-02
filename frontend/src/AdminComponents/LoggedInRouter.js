import React from 'react'
import { Route, useRouteMatch } from "react-router-dom";

import Home from "./Views/Home/Home.jsx";

import AddCenter from "./Views/Center/AddCenter/AddCenter.jsx"
import CenterReport from "./Views/Center/CenterReport/CenterReport.jsx"

import AddCourse from "./Views/Course/AddCourse/AddCourse.jsx"
import ViewCourses from "./Views/Course/ViewCourses/ViewCourses.jsx"

export default function LoggedInRouter() {
    const { path } = useRouteMatch();
    return (
        <>
            <Route exact path={`${path}`}><Home /></Route>
            <Route exact path={`${path}/centers`}><CenterReport /></Route>
            <Route exact path={`${path}/center/new`}><AddCenter /></Route>
            <Route exact path={`${path}/courses`}><ViewCourses /></Route>
            <Route exact path={`${path}/Course/new`}><AddCourse /></Route>
        </>
    )
}
