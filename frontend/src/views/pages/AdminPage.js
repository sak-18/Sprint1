import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Dashboard from "../../components/Utils/Dashboard.js";
import NewCourse from "../../components/Utils/NewCourse.js";
// sections for this page

function AdminPage() {
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
      {/* <Dashboard /> */}
      {/* <Route exact path={`${match.path}/new-course`} component={NewCourse} /> */}
    </div>
  );
}

export default AdminPage;
