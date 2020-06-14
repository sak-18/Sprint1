<<<<<<< HEAD
import React from "react";
=======
import React, { Component } from "react";
>>>>>>> repo2/master
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
  UncontrolledTooltip
} from "reactstrap";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import CourseHomeHeader from "../../components/Headers/CourseHomeHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import AddReview from "../../components/Utils/AddReview.js";
import Review from "../../components/Utils/Review.js";
import Reviews from "../../components/Utils/Reviews.js";
<<<<<<< HEAD

function CourseHome() {
  let match = useRouteMatch();
  const [pills, setPills] = React.useState("2");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <CourseHomeHeader />
        <div className="section">
          <Container>
            
            <h3 className="title">
              Course Description
            </h3>
            <h5 className="description">
            This course provides the knowledge and skills necessary to effectively participate and contribute to project
            teams in software development following a suitable methodology. 
            The main objective of this course is to offer widely used software development methodologies so that the students will be able to select an
            appropriate software process model and architecture for a given type of development project,
            and to make students build a software system in small teams adhering to a widely used agile methodology by
            practicing relevant techniques pertaining to activities such as requirements elicitation and analysis,
            requirements modeling and specification, software development, testing and project management.
            </h5>
            <Route
              exact
              path={`${match.path}/add-review`}
              component={AddReview}
            />
            <Route
              exact
              path={`${match.path}/Review/:reviewId`}
              component={Review}
            />
            <Route exact path={`${match.path}`} component={Reviews} />
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

=======
import { getDecodedToken, checkToken } from "../../utils/jwt";
import { Redirect } from "react-router-dom";


class CourseHome extends Component{
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
          <ExamplesNavbar />
          <div className="wrapper">
            <CourseHomeHeader />
            <div className="section">
              <Container>
                
                <h3 className="title">
                  Course Description
                </h3>
                <h5 className="description">
                This course provides the knowledge and skills necessary to effectively participate and contribute to project
                teams in software development following a suitable methodology. 
                The main objective of this course is to offer widely used software development methodologies so that the students will be able to select an
                appropriate software process model and architecture for a given type of development project,
                and to make students build a software system in small teams adhering to a widely used agile methodology by
                practicing relevant techniques pertaining to activities such as requirements elicitation and analysis,
                requirements modeling and specification, software development, testing and project management.
                </h5>
                <Route
                  exact
                  path={`/courses/ISF341/add-review`}
                  component={AddReview}
                />
                <Route
                  exact
                  path={`/courses/ISF341/Review/:reviewId`}
                  component={Review}
                />
                <Route exact path={`/courses/ISF341`} component={Reviews} />
              </Container>
            </div>
            <DefaultFooter />
          </div>
        </>
      );
    }
  }  
}
>>>>>>> repo2/master
export default CourseHome;
