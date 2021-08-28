import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { apiBaseURL } from "../Config";

const StudentAuthContext = createContext();

function StudentAuthContextProvider(props) {
  const [studentLoggedIn, setStudentLoggedIn] = useState(undefined);
  const [studentName, setStudentName] = useState(undefined);
  const [studentEmail, setStudentEmail] = useState(undefined);
  const [studentCenter, setStudentCenter] = useState(undefined);

  async function getStudentLoggedIn() {
    const loggedInRes = await axios.get(`${apiBaseURL}/student/loggedIn`);
    setStudentLoggedIn(loggedInRes.data.authorized);
    setStudentName(loggedInRes.data.name);
    setStudentEmail(loggedInRes.data.email);
    setStudentCenter(loggedInRes.data.center);
  }

  useEffect(() => {
    getStudentLoggedIn();
  }, []);

  return (
    <StudentAuthContext.Provider value={{ studentName, studentEmail, studentCenter, studentLoggedIn, getStudentLoggedIn }}>
      {props.children}
    </StudentAuthContext.Provider>
  );
}

export default StudentAuthContext;
export { StudentAuthContextProvider };