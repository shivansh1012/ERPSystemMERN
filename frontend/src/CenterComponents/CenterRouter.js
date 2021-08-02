import React, { useContext } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import "../App.css";

//authorization
import CenterAuthContext from "./CenterAuthContext";

//import components
import Login from "./Views/Login/Login.jsx";
import Sidebar from "./Layouts/Sidebar/Sidebar.jsx";
import Topbar from "./Layouts/Topbar/Topbar.jsx";

import LoggedInRouter from "./LoggedInRouter";

export default function Router() {
    const { centerLoggedIn } = useContext(CenterAuthContext);
    const { path } = useRouteMatch();
    return (
        <>
            {centerLoggedIn === true && (
                <>
                    <Topbar />
                    <div className="container">
                        <Sidebar />
                        <LoggedInRouter />
                    </div>
                </>
            )}
            {centerLoggedIn === false && (
                <>
                    <Route exact path={`${path}`}>
                    <div>{centerLoggedIn}</div>
                        <Login />
                    </Route>
                </>
            )}
        </>
    )
}
