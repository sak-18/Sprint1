import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Route, Switch, useRouteMatch } from "react-router-dom";
import axios from "axios";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
//import "assets/css/DiscussionPage.css";
import DiscussionNavbar from "../../components/Navbars/DiscussionNavbar.js";
import "../../assets/css/DiscussionPage.css";
// core components
import NewQuestion from "../../components/Utils/NewQuestion.js";
import Questions from "../../components/Utils/Questions.js";
import Question from "../../components/Utils/Question.js";
import NotFound from "../../components/Utils/NotFound.js";

function DiscussionPage(props) {
  let match = useRouteMatch();
  //console.log(props.location.customNameData);
  console.log(window.response.profileObj);
  axios.post("/routes/users/", {
    // ********************CHANGED "http://localhost:4000" WORKING
    name: window.response.profileObj.name,
    email: window.response.profileObj.email,
    imageUrl: window.response.profileObj.imageUrl,
  });
  return (
    <div>
      <DiscussionNavbar />
      <br />
      <br />
      <br />
      <br />
      <Button to="courses/ISF341" color="info" tag={Link} size="lg">
        ISF341
      </Button>
      <div className="jumbotron">
        <h1 className="display-4">Howdy, {window.response.profileObj.name}!</h1>
        <p className="lead">We got these details about you.</p>
        <hr className="my-4" />
        <center>
          <div className="profile-container">
            <div className="profile-item">
              <ul className="list-group">
                <li className="list-group-item">
                  <div>
                    <b>Name</b>: {window.response.profileObj.name}
                  </div>
                </li>
                <li className="list-group-item">
                  <div>
                    <b>Email</b>: {window.response.profileObj.email}
                  </div>
                </li>
              </ul>
              <div className="profile-item">
                <img
                  className="photo"
                  src={window.response.profileObj.imageUrl}
                  alt="profile image"
                />
              </div>
            </div>
          </div>
        </center>
      </div>

      <Route
        exact
        path={`${match.path}/new-question`}
        component={NewQuestion}
      />
      <Route
        exact
        path={`${match.path}/question/:questionId`}
        component={Question}
      />
      <Route exact path={`${match.path}`} component={Questions} />
      <Route path="/discussion-page/test" component={NotFound} />
    </div>
  );
}

export default DiscussionPage;
