import React from 'react'
import { Route, useRouteMatch, Redirect } from "react-router-dom";

import Home from "./Views/Home/Home.jsx";

import AddCenter from "./Views/Center/AddCenter/AddCenter.jsx"
import CenterReport from "./Views/Center/CenterReport/CenterReport.jsx"

import AddCourse from "./Views/Course/AddCourse/AddCourse.jsx"
import ViewCourses from "./Views/Course/ViewCourses/ViewCourses.jsx"

import Manage from "./Views/Manage/Manage.jsx";
import Analytics from "./Views/Analytics/Analytics.jsx";
import Report from "./Views/Report/Report.jsx";

import AddChapters from "./Views/Course/AddChapters/AddChapters.jsx"

export default function LoggedInRouter(props) {
    const { path } = useRouteMatch();
    return (
        <>
            <Route exact path={`${path}`}><Home adminName={props.adminName} adminEmail={props.adminEmail}/></Route>
            
            <Route exact path={`${path}/centers`}><CenterReport /></Route>
            <Route exact path={`${path}/center/new`}><AddCenter /></Route>

            <Route exact path={`${path}/courses`}><ViewCourses /></Route>
            <Route exact path={`${path}/Course/new`}><AddCourse /></Route>
            <Route exact path={`${path}/Course/chapters`}><AddChapters /></Route>

            <Route exact path={`${path}/manage`}><Manage /></Route>
            <Route exact path={`${path}/analytics`}><Analytics /></Route>
            <Route exact path={`${path}/report`}><Report /></Route>

            {/* <Route render={() => <Redirect to={{pathname: `${path}`}} />} /> */}
        </>
    )
}
