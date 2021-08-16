import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { apiBaseURL } from "../Config";

const StudentAuthContext = createContext();

function StudentAuthContextProvider(props) {
  const [studentLoggedIn, setStudentLoggedIn] = useState(undefined);

  async function getStudentLoggedIn() {
    const loggedInRes = await axios.get(`${apiBaseURL}/student/loggedIn`);
    setStudentLoggedIn(loggedInRes.data.authorized);
  }

  useEffect(() => {
    getStudentLoggedIn();
  }, []);

  return (
    <StudentAuthContext.Provider value={{ studentLoggedIn, getStudentLoggedIn }}>
      {props.children}
    </StudentAuthContext.Provider>
  );
}

export default StudentAuthContext;
export { StudentAuthContextProvider };