import React from 'react'
import { Route, useRouteMatch } from "react-router-dom";

import Home from "./Views/Home/Home.jsx";
import BatchList from './Views/Batch/BatchList.jsx';
import Profile from "./Views/Profile/Profile.jsx";

export default function StudentLoggedInRouter() {
    const { path } = useRouteMatch();
    return (
        <>
            <Route exact path={`${path}`}><Home /></Route>

            <Route exact path={`${path}/batch`}><BatchList /></Route>

            <Route exact path={`${path}/profile`}><Profile /></Route>

            {/* <Route render={() => <Redirect to={{pathname: `${path}`}} />} /> */}
        </>
    )
}
