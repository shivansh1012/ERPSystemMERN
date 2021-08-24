//Modules
import React, { useContext } from "react";
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import "../App.css";

//Authorization
import AdminAuthContext from "./AdminAuthContext";

//Components
import Login from "./Views/Login/Login.jsx";
import Sidebar from "./Layouts/Sidebar/Sidebar.jsx";
import Topbar from "./Layouts/Topbar/Topbar.jsx";
import LoggedInRouter from "./LoggedInRouter";

export default function Router() {
    const { adminLoggedIn } = useContext(AdminAuthContext);
    const { path } = useRouteMatch();
    return (
        <>
            {adminLoggedIn === true && (
                <>
                    <Topbar />
                    <div className="container">
                        <Sidebar />
                        <LoggedInRouter />
                    </div>
                </>
            )}
            {adminLoggedIn === false && (
                <>
                    <Route exact path={`${path}`}>
                        <Login />
                    </Route>

                    <Route render={() => <Redirect to={{ pathname: `${path}` }} />} />
                </>
            )}
        </>
    )
}
