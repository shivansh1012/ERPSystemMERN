import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
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
        <Route exact path="/">
          <IndexPage />
        </Route>

        <Route path="/enquiryform">
          <EnquiryForm />
        </Route>

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
      </Switch>
    </BrowserRouter>
  );
}