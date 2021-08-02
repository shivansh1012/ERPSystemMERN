import React from 'react'
import { Route, useRouteMatch } from "react-router-dom";

import Home from "./Views/Home/Home.jsx";
import NewEmployee from './Views/Employee/NewEmployee/NewEmployee.jsx';
import NewStudent from './Views/Student/NewStudent/NewStudent.jsx';

export default function LoggedInRouter() {
    const { path } = useRouteMatch();
    return (
        <>
        <Route exact path={`${path}`}><Home/></Route>
        <Route exact path={`${path}/student`}><div>StudentList</div></Route>
        <Route exact path={`${path}/student/new`}><NewStudent/></Route>
        <Route exact path={`${path}/employee`}><div>EmployeeList</div></Route>
        <Route exact path={`${path}/employee/new`}><NewEmployee/></Route>
        </>
    )
}
