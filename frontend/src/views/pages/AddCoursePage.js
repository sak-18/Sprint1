import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
// reactstrap components
// import {
// } from "reactstrap";

// core components
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import NewCourse from "../../components/Utils/NewCourse.js";
// sections for this page

function AddCoursePage() {
  let match = useRouteMatch();
  React.useEffect(() => {
    document.body.classList.add("admin-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("admin-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <div>
      <AdminNavbar />
      <NewCourse></NewCourse>
    </div>
  );
}

export default AddCoursePage;
