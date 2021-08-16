import React, { useContext } from "react";
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import "../App.css";

//authorization
import CenterAuthContext from "./CenterAuthContext";

//import components
import Login from "./Views/Login/Login.jsx";
import Sidebar from "./Layouts/Sidebar/Sidebar.jsx";
import Topbar from "./Layouts/Topbar/Topbar.jsx";

import LoggedInRouter from "./LoggedInRouter";

export default function CenterRouter() {
    const { centerLoggedIn, employeeName, centerName, permissionLevel } = useContext(CenterAuthContext);
    const { path } = useRouteMatch();
    return (
        <>
            {centerLoggedIn === true && (
                <>
                    <Topbar employeeName={employeeName} centerName={centerName}/>
                    <div className="container">
                        <Sidebar permissionLevel={permissionLevel}/>
                        <LoggedInRouter />
                    </div>
                </>
            )}
            {centerLoggedIn === false && (
                <>
                    <Route exact path={`${path}`}>
                        <Login />
                    </Route>

                    <Route render={() => <Redirect to={{pathname: `${path}`}} />} />
                </>
            )}
            {centerLoggedIn === "error" && (
                <>
                    <div>Server Not Running</div>
                </>
            )}
        </>
    )
}
