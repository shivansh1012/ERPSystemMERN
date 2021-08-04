import React from 'react'
import { Route, useRouteMatch } from "react-router-dom";

import Home from "./Views/Home/Home.jsx";

export default function StudentLoggedInRouter() {
    const { path } = useRouteMatch();
    return (
        <>
            <Route exact path={`${path}`}><Home /></Route>

            {/* <Route render={() => <Redirect to={{pathname: `${path}`}} />} /> */}
        </>
    )
}
