import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { apiBaseURL } from "../Config";

const CenterAuthContext = createContext();

function CenterAuthContextProvider(props) {
  const [centerLoggedIn, setCenterLoggedIn] = useState(undefined);

  async function getCenterLoggedIn() {
    const loggedInRes = await axios.get(`${apiBaseURL}/center/loggedIn`);
    setCenterLoggedIn(loggedInRes.data);
  }

  useEffect(() => {
    getCenterLoggedIn();
  }, []);

  return (
    <CenterAuthContext.Provider value={{ centerLoggedIn, getCenterLoggedIn }}>
      {props.children}
    </CenterAuthContext.Provider>
  );
}

export default CenterAuthContext;
export { CenterAuthContextProvider };