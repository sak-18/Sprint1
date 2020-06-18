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
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import "../../assets/css/DiscussionPage.css";
// core components
import Reports from "../../components/Utils/Reports.js";
import NotFound from "../../components/Utils/NotFound.js";
import { getDecodedToken, checkToken } from "../../utils/jwt";
import { Col } from "reactstrap";
import SeeAll from "./SeeAll";

class DiscussionPage extends Component {
  constructor(props) {
    super(props);

    // this.user = getDecodedToken();
    // this.state = {
    //   courses: [],
    //   authenticated: checkToken(),
    // };
  }

  async componentDidMount() {
    // await axios.get("/routes/courses").then(res => {
    //   let courses = [];
    //   res.data.forEach(course => {
    //     courses.push(course);
    //   });
    //   this.setState({
    //     courses,
    //   });
    // });
  }

  


  render() {
      return (
        <Container>
        <AdminNavbar/>  
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col lg="11"> 
            <Route exact path={`/admin-review`} component={Reports} />
            <Route path="/discussion-page/test" component={NotFound} />
          </Col>
          
        </Row>
      </Container>
      );
    }
  }
export default DiscussionPage;
      