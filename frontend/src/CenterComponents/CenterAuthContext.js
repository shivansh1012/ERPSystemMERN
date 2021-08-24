import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { apiBaseURL } from "../Config";

const CenterAuthContext = createContext();

function CenterAuthContextProvider(props) {
  const [centerLoggedIn, setCenterLoggedIn] = useState(undefined);
  const [employeeName, setEmployeeName] = useState(undefined);
  const [employeeEmail, setEmployeeEmail] = useState(undefined);
  const [centerName, setCenterName] = useState(undefined);
  const [permissionLevel, setPermissionLevel] = useState(undefined);

  async function getCenterLoggedIn() {
    const loggedInRes = await axios.get(`${apiBaseURL}/center/loggedIn`);

    setCenterLoggedIn(loggedInRes.data.authorized);
    setEmployeeName(loggedInRes.data.name);
    setEmployeeEmail(loggedInRes.data.email);
    setCenterName(loggedInRes.data.center);
    setPermissionLevel(loggedInRes.data.permissionLevel)
  }

  useEffect(() => {
    getCenterLoggedIn();
  }, []);

  return (
    <CenterAuthContext.Provider value={{ centerLoggedIn, employeeName, employeeEmail, centerName, permissionLevel, getCenterLoggedIn }}>
      {props.children}
    </CenterAuthContext.Provider>
  );
}

export default CenterAuthContext;
export { CenterAuthContextProvider };