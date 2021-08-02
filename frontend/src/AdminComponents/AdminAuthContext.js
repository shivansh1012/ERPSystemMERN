import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { apiBaseURL } from "../Config";

const AdminAuthContext = createContext();

function AdminAuthContextProvider(props) {
  const [adminLoggedIn, setAdminLoggedIn] = useState(undefined);

  async function getAdminLoggedIn() {
    const loggedInRes = await axios.get(`${apiBaseURL}/admin/loggedIn`);
    setAdminLoggedIn(loggedInRes.data);
  }

  useEffect(() => {
    getAdminLoggedIn();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ adminLoggedIn, getAdminLoggedIn }}>
      {props.children}
    </AdminAuthContext.Provider>
  );
}

export default AdminAuthContext;
export { AdminAuthContextProvider };