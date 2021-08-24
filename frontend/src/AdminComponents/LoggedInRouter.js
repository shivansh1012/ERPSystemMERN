import React from 'react'
import { Route, useRouteMatch } from "react-router-dom";

import Home from "./Views/Home/Home.jsx";

import AddCenter from "./Views/Center/AddCenter/AddCenter.jsx"
import CenterReport from "./Views/Center/CenterReport/CenterReport.jsx"
import AddChapters from "./Views/Course/AddChapters/AddChapters.jsx"

import AddCourse from "./Views/Course/AddCourse/AddCourse.jsx"
import ViewCourses from "./Views/Course/ViewCourses/ViewCourses.jsx"

import Manage from "./Views/Manage/Manage.jsx";
import Analytics from "./Views/Analytics/Analytics.jsx";
import Report from "./Views/Report/Report.jsx";


export default function LoggedInRouter(props) {
    const { path } = useRouteMatch();
    return (
        <>
            <Route exact path={`${path}`}><Home/></Route>
            
            <Route exact path={`${path}/center`}><CenterReport /></Route>
            <Route exact path={`${path}/center/new`}><AddCenter /></Route>

            <Route exact path={`${path}/course`}><ViewCourses /></Route>
            <Route exact path={`${path}/course/new`}><AddCourse /></Route>
            <Route exact path={`${path}/course/chapter`}><AddChapters /></Route>

            <Route exact path={`${path}/manage`}><Manage /></Route>
            <Route exact path={`${path}/analytics`}><Analytics /></Route>
            <Route exact path={`${path}/report`}><Report /></Route>

            {/* <Route render={() => <Redirect to={{pathname: `${path}`}} />} /> */}
        </>
    )
}
