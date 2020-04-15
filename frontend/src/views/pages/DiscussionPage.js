import React from "react";
import { Link } from "react-router-dom";

import { Route, Switch, useRouteMatch } from "react-router-dom";
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

// core components
import NewQuestion from "../../components/Utils/NewQuestion.js";
import Questions from "../../components/Utils/Questions.js";
import Question from "../../components/Utils/Question.js";
import NotFound from "../../components/Utils/NotFound.js";

function DiscussionPage() {
  let match = useRouteMatch();
  return (
    <div>
      <DiscussionNavbar />
      <p>This goes behind navbar for some reason</p>
      <br />
      <Button
        to="courses/ISF341"
        color="info"
        tag={Link}
        size="lg"
      >
        ISF341
      </Button>
      
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
