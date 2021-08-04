import React, { useContext } from "react";
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import "../App.css";

//authorization
import StudentAuthContext from "./StudentAuthContext";

//import components
import Login from "./Views/Login/Login.jsx";
import Sidebar from "./Layouts/Sidebar/Sidebar.jsx";
import Topbar from "./Layouts/Topbar/Topbar.jsx";

import StudentLoggedInRouter from "./StudentLoggedInRouter";

export default function StudentRouter() {
    const { studentLoggedIn } = useContext(StudentAuthContext);
    const { path } = useRouteMatch();
    return (
        <>
            {studentLoggedIn === true && (
                <>
                    <Topbar />
                    <div className="container">
                        <Sidebar />
                        <StudentLoggedInRouter />
                    </div>
                </>
            )}
            {studentLoggedIn === false && (
                <>
                    <Route exact path={`${path}`}>
                        <Login />
                    </Route>

                    <Route render={() => <Redirect to={{pathname: `${path}`}} />} />
                </>
            )}
        </>
    )
}
