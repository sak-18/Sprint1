import React, { Component } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Container, Row, Col } from "shards-react";
import axios from "axios";
import PropTypes from "prop-types";
import BlogOverview from "../../ShardDashboard/src/views/BlogOverview.jsx";
import UserOverview from "../../ShardDashboard/src/components/blog/UsersOverview";
import UserByDevice from "../../ShardDashboard/src/components/blog/UsersByDevice";
import SmallStats from "../../ShardDashboard/src/components/common/SmallStats";
//import "bootstrap/dist/css/bootstrap.min.css";
//import "../../ShardDashboard/src/shards-dashboard/styles/shards-dashboards.1.1.0.min.scoped.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    //require("../../ShardDashboard/src/shards-dashboard/styles/shards-dashboards.1.1.0.min.css");
    this.state = {
      //questions: null,
      //match: null
    };
  }

  async componentDidMount() {}

  async componentWillMount() {
    /*
    let match = useRouteMatch();
    this.setState({
      match
    });
    */
  }

  render() {
    return (
      <>
        <BlogOverview></BlogOverview>        
      </>
    );
  }
}

export default Dashboard;
