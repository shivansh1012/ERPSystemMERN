import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

import { AdminAuthContextProvider } from "./AdminComponents/AdminAuthContext";
import { CenterAuthContextProvider } from "./CenterComponents/CenterAuthContext";

import AdminRouter from "./AdminComponents/AdminRouter.js";
import CenterRouter from "./CenterComponents/CenterRouter.js";
import EnquiryForm from "./GenericComponents/EnquiryForm/EnquiryForm.jsx";
import IndexPage from "./GenericComponents/IndexPage/IndexPage.jsx";

axios.defaults.withCredentials = true;

export default function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />

        <Route path="/enquiryform" component={EnquiryForm}/>

        <Route path="/admin">
          <AdminAuthContextProvider>
            <AdminRouter />
          </AdminAuthContextProvider>
        </Route>

        <Route path="/center">
          <CenterAuthContextProvider>
            <CenterRouter />
          </CenterAuthContextProvider>
        </Route>

        <Route render={() => <Redirect to={{pathname: "/"}} />} />
      </Switch>
    </BrowserRouter>
  );
}