import React, { Component } from "react";
import {
  withRouter,
  Route,
  Switch,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import ReactSpeedometer from "react-d3-speedometer";

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

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import CourseHomeHeader from "../../components/Headers/CourseHomeHeader.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";
import AddReview from "../../components/Utils/AddReview.js";
import Reviews from "../../components/Utils/Reviews.js";
import { getDecodedToken, checkToken } from "../../utils/jwt";
import { Redirect } from "react-router-dom";
import { axios } from "axios";
class CourseHome extends Component {
  constructor(props) {
    super(props);

    this.user = getDecodedToken();
    this.state = {
      authenticated: checkToken(),
    };
  }
  async componentDidMount() {
    const url = "/routes/courses/" + this.props.match.params.courseId;
    console.log(url);
    //const courses = (await axios.get(url)).data;
    //console.log(courses);

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          courseid: data[0].courseid,
          title: data[0].title,
          instructor: data[0].instructor,
          description: data[0].description,
          averagerating: data[0].averagerating,
          numberofreviews: data[0].numberofreviews,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    if (!this.state.authenticated) {
      return <Redirect to="/index" />;
    } else {
      return (
        <>
          <ExamplesNavbar />
          <div className="wrapper">
            <CourseHomeHeader
              courseid={this.state.courseid}
              instructor={this.state.instructor}
              title={this.state.title}
            />
            <div className="section">
              <Container>
                <h3 className="title">Course Description</h3>
                <h5 className="description">{this.state.description}</h5>
                  <Col lg={12} className="pt-5">
                  <center>
                  <ReactSpeedometer
                    maxValue={5}
                    value={this.state.averagerating}
                    needleColor="blue"
                    startColor="green"
                    endColor="red"
                    maxSegmentLabels={5}
                    segments={10}
                  />
                   </center> 
                <center>Course Rating</center>
                  </Col>
                <Route
                  exact
                  path={`/courses/` + this.state.courseid + `/add-review`}
                  render={(props) => (
                    <AddReview {...props} courseid={this.state.courseid} />
                  )}
                />
               
                <Route
                  exact
                  path={`/courses/` + this.state.courseid}
                  render={(props) => (
                    <Reviews {...props} courseid={this.state.courseid} />
                  )}
                />
              </Container>
            </div>
            <DefaultFooter />
          </div>
        </>
      );
    }
  }
}
export default withRouter(CourseHome);
