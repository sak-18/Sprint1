import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

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

class SelectCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      selectedCourse: "",
      validationError: "",
    };
  }
  componentDidMount() {
    fetch("/routes/courses")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let CoursesFromApi = data.map((course) => {
          return { value: course.courseid, display: course.title };
        });
        this.setState({
          courses: [
            {
              value: "x",
              display: "(Select your Course)",
            },
          ].concat(CoursesFromApi),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Button
          to={"courses/" + this.state.selectedCourse}
          color="info"
          tag={Link}
          size="lg"
        >
          Go to course
        </Button>
        <select
          value={this.state.selectedCourse}
          onChange={(e) =>
            this.setState({
              selectedCourse: e.target.value,
              validationError:
                e.target.value === "x" ? "You must select a course" : "",
            })
          }
        >
          {this.state.courses.map((course) => (
            <option key={course.value} value={course.value}>
              {course.display}
            </option>
          ))}
        </select>
        <div
          style={{
            color: "red",
            marginTop: "5px",
          }}
        >
          {this.state.validationError}
        </div>
      </div>
    );
  }
}

class DiscussionPage extends Component {
  constructor(props) {
    super(props);

    this.user = getDecodedToken();
    this.state = {
      authenticated: checkToken(),
    };
  }
  render() {
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
            <Button to={"courses/ISF341"} color="info" tag={Link} size="lg">
              ISF341
            </Button>
            <SelectCourse></SelectCourse>
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
