import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Route, useRouteMatch } from "react-router-dom";
import axios from "axios";
// reactstrap components
import { Button } from "reactstrap";
//import "assets/css/DiscussionPage.css";
import DiscussionNavbar from "../../components/Navbars/DiscussionNavbar.js";
import "../../assets/css/DiscussionPage.css";
// core components
import NewQuestion from "../../components/Utils/NewQuestion.js";
import Questions from "../../components/Utils/Questions.js";
import Question from "../../components/Utils/Question.js";
import NotFound from "../../components/Utils/NotFound.js";
import { getDecodedToken, checkToken } from "../../utils/jwt";
import { Col } from "reactstrap";
import SeeAll from "./SeeAll";

class DiscussionPage extends Component {
  constructor(props) {
    super(props);

    this.user = getDecodedToken();
    this.state = {
      courses: [],
      authenticated: checkToken(),
    };
  }

  async componentDidMount() {
    await axios.get("/routes/courses").then(res => {
      let courses = [];
      res.data.forEach(course => {
        courses.push(course);
      });
      this.setState({
        courses,
      });
    });
  }

  

  generateCourseList() {
    let courses = [];
    this.state.courses.forEach(course => {
        courses.push(
          <Container>
          <Row >
          <Button to={"courses/${course.courseid}"} color="info" tag={Link} size="lg">
            {course.courseid}
          </Button>
          </Row>
          </Container>
        );
      }
    );
    return <SeeAll items={courses} count={10} name="courses"/>;
  }


  render() {
    if (!this.state.authenticated) {
      return <Redirect to="/index" />;
    } else {
      return (
        <Container>
        <DiscussionNavbar />  
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col lg="2.5">
            <Row>
              <Col>
                <h5>Courses</h5>
                <hr />
                {this.generateCourseList()}
              </Col>
            </Row>
          </Col>
          <Col lg="9">       
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
          </Col>
          
        </Row>
      </Container>
      );
    }
  }
}
export default DiscussionPage;
      