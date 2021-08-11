import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { apiBaseURL } from "../Config";

const CenterAuthContext = createContext();

function CenterAuthContextProvider(props) {
  const [centerLoggedIn, setCenterLoggedIn] = useState(undefined);
  const [employeeName, setEmployeeName] = useState(undefined);
  const [employeeEmail, setEmployeeEmail] = useState(undefined);
  const [centerName, setCenterName] = useState(undefined);

  async function getCenterLoggedIn() {
    const loggedInRes = await axios.get(`${apiBaseURL}/center/loggedIn`);
    // console.log(loggedInRes.data)
    setCenterLoggedIn(loggedInRes.data.authorized);
    setEmployeeName(loggedInRes.data.name);
    setEmployeeEmail(loggedInRes.data.email);
    setCenterName(loggedInRes.data.center);
  }

  useEffect(() => {
    getCenterLoggedIn();
  }, []);

  return (
    <CenterAuthContext.Provider value={{ centerLoggedIn, employeeName, employeeEmail, centerName, getCenterLoggedIn }}>
      {props.children}
    </CenterAuthContext.Provider>
  );
}

export default CenterAuthContext;
export { CenterAuthContextProvider };