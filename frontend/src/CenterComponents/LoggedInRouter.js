import React from 'react'
import { Route, useRouteMatch } from "react-router-dom";

import Home from "./Views/Home/Home.jsx";

import NewStudent from './Views/Student/NewStudent/NewStudent.jsx';
import StudentList from "./Views/Student/StudentList/StudentList.jsx";

import NewEmployee from './Views/Employee/NewEmployee/NewEmployee.jsx';
import EmployeeList from './Views/Employee/EmployeeList/EmployeeList.jsx';

import EnquiryList from './Views/Enquiry/EnquiryList.jsx';

import Report from "./Views/Report/Report.jsx";
import Analytics from "./Views/Analytics/Analytics.jsx";

export default function LoggedInRouter() {
    const { path } = useRouteMatch();
    return (
        <>
            <Route exact path={`${path}`}><Home /></Route>

            <Route exact path={`${path}/student`}><StudentList /></Route>
            <Route exact path={`${path}/student/new`}><NewStudent /></Route>

            <Route exact path={`${path}/employee`}><EmployeeList /></Route>
            <Route exact path={`${path}/employee/new`}><NewEmployee /></Route>

            <Route exact path={`${path}/enquiry`}><EnquiryList /></Route>

            <Route exact path={`${path}/analytics`}><Analytics /></Route>
            <Route exact path={`${path}/report`}><Report /></Route>

            {/* <Route render={() => <Redirect to={{pathname: `${path}`}} />} /> */}
        </>
    )
}
