import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { apiBaseURL } from "../Config";

const AdminAuthContext = createContext();

function AdminAuthContextProvider(props) {
  const [adminLoggedIn, setAdminLoggedIn] = useState(undefined);
  const [adminName, setAdminName] = useState(undefined);
  const [adminEmail, setAdminEmail] = useState(undefined);

  async function getAdminLoggedIn() {
    const loggedInRes = await axios.get(`${apiBaseURL}/admin/loggedIn`);
    // console.log(loggedInRes.data)
    setAdminLoggedIn(loggedInRes.data.authorized);
    setAdminName(loggedInRes.data.name);
    setAdminEmail(loggedInRes.data.email);
  }

  useEffect(() => {
    getAdminLoggedIn();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ adminLoggedIn, adminName, adminEmail, getAdminLoggedIn }}>
      {props.children}
    </AdminAuthContext.Provider>
  );
}

export default AdminAuthContext;
export { AdminAuthContextProvider };