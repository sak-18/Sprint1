/*

=========================================================
* Now UI Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useParams,
} from "react-router-dom";

// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";
//import "./ShardDashboard/src/shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

//import "assets/css/DiscussionPage.css";

// pages for this kit
import Index from "./views/Index.js";
import LoginPage from "./views/pages/LoginPage.js";
import RegisterPage from "./views/pages/RegisterPage.js";
import CourseHomePage from "./views/pages/CourseHome.js";
import Logout from "./components/Utils/logout.js";
import AdminPage from "./views/pages/AdminPage.js";
import AdminReviewPage from "./views/pages/AdminResolutionPage.jsx";
import AddCoursePage from "./views/pages/AddCoursePage.js";
import DiscussionPage from "./views/pages/DiscussionPage.jsx";
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/index" render={(props) => <Index {...props} />} />
        
        <Route
          path="/courses/:courseId"
          render={(props) => <CourseHomePage {...props} />}
        />
        <Route
          path="/discussion-page"
          render={(props) => <DiscussionPage {...props} />}
        />
        <Route
          path="/login-page"
          render={(props) => <LoginPage {...props} />}
        />
        <Route path="/logout" render={(props) => <Logout {...props} />} />
        <Route
          path="/admin-page"
          render={(props) => <AdminPage {...props} />}
        />
        <Route
          path="/admin-review"
          render={(props) => <AdminReviewPage {...props} />}
        />
        <Route
          path="/addcourse-page"
          render={(props) => <AddCoursePage {...props} />}
        />
        <Route
          path="/register-page"
          render={(props) => <RegisterPage {...props} />}
        />
        <Redirect to="/index" />
        <Redirect from="/" to="/index" />
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
