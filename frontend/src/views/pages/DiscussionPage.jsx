import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { Route, useRouteMatch } from "react-router-dom";
import axios from "axios";
// reactstrap components
import {
  Button,
} from "reactstrap";
//import "assets/css/DiscussionPage.css";
import DiscussionNavbar from "../../components/Navbars/DiscussionNavbar.js";
import "../../assets/css/DiscussionPage.css";
// core components
import NewQuestion from "../../components/Utils/NewQuestion.js";
import Questions from "../../components/Utils/Questions.js";
import Question from "../../components/Utils/Question.js";
import NotFound from "../../components/Utils/NotFound.js";
import { getDecodedToken, checkToken } from "../../utils/jwt";
 
class DiscussionPage extends Component{
  constructor(props){
    super(props);

    this.user = getDecodedToken();
    this.state = {
      authenticated: checkToken(),
    };
  }
  render(){
    if (!this.state.authenticated) {
      return <Redirect to="/index" />;
    } else {
      return (
        <>
          <div>
          <DiscussionNavbar />
          <br />
          <br />
          <br />
          <br />
          <Button to="courses/ISF341" color="info" tag={Link} size="lg">
            ISF341
          </Button>
          <Route
            exact
            path={`/discussion-page/new-question`}
            component={NewQuestion}
          />
          <Route
            exact
            path={`/discussion-page/question/:questionId`}
            component={Question}
          />
          <Route exact path={`/discussion-page`} component={Questions} />
          <Route path="/discussion-page/test" component={NotFound} />
        </div>
        </>
      );
    }
  }
}
export default DiscussionPage;