import React, { Component } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { get, groupBy, pick, sortBy } from "lodash";

import ButtonToolbar from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import TimeAgo from "react-timeago";
import { getDecodedToken } from "../../utils/jwt";


import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Button from "react-bootstrap/Button";
class Questions extends Component {
  constructor(props) {
    super(props);
    this.user = getDecodedToken();
    this.state = {
      reports: null,
    };
  }
  async componentDidMount() {
    const reports = (await axios.get("/routes/reports")).data; // WORKING********************CHANGED "http://localhost:4000/"
    this.setState({
      reports,
    });
  }

  async componentWillMount() {
    /*
    let match = useRouteMatch();
    this.setState({
      match
    });
    */
  }
  dummy(){

  }
  render() {
    return (
      <div className="container">
        <p> Sort By </p>
        <small className="text-muted">
          Default: Most recent last
        </small>
        <br/>
        
        {this.state.reports ? (
          <ButtonToolbar style={{ marginBottom: "5px", marginLeft: "10px" }}>
            <ToggleButtonGroup
              type="radio"
              name="options"
              size="sm"
              defaultValue={2}
              onChange={value => {
                let reports = [...this.state.reports];
                let sortFunc = param => (a, b) => {
                  if (get(a, param) === get(b, param)) return 0;
                  return get(a, param) > get(b, param) ? -1 : 1;
                };
                reports.sort(sortFunc("time"));
                switch (value) {
                  case 1: {
                    reports.sort(sortFunc("time"));
                    break;
                  }
                  default: {
                    reports.sort(sortFunc("time"));
                    break;
                  }
                }
                this.setState({ reports: reports });
              }}
            >
              <ToggleButton variant="outline-primary" value={1}>
                Most Recent
              </ToggleButton>
              
            </ToggleButtonGroup>
          </ButtonToolbar>
        ) : null}
        <div className="row">
          {this.state.reports === null && <p>Looks Empty In Here! </p>}
          {this.state.reports &&
            this.state.reports.map((report) => (
              <div key={report._id} className="col-sm-12 col-md-10 col-lg-12">
                <div className="card text-dark shadow p-4 mb-3 bg-light">
                  <div className="card-body">
                    <Container>
                      <Row>
                        <Col>
                            <p> {report.contentType} Reported by {report.reportedby}</p>
                            <Col style={{ wordWrap: "break-word" }}>
                            <h3 className="card-title">{report.title}</h3>
                            <h4 className="card-text">{report.description}</h4>
                            <p>Posted by {report.postedby}</p>
                            <small className="text-muted">
                            <p>Reported</p>
                                <TimeAgo date={report.time} />
                            </small>
                                <Row>
                                    <button
                                      disabled={this.state.disabled}
                                      className="btn btn-primary"
                                      onClick={() => {
                                        var url="/routes/"+String(report.contentType)+"s/remove/"+String(report.identifier);
                                        axios.delete(url);
                                        var url2="/routes/reports/remove/"+String(report._id);
                                        axios.delete(url2);
                                        var url3= "routes/resolvedReport";
                                        axios.post(url3, {
                                          contentType: report.contentType,
                                          identifier: report.identifier,
                                          reportedby: report.reportedby,
                                          postedby: report.postedby,
                                          title: report.title,
                                          description: report.description,
                                          resolutionStatus: "deleted",
                                        });
                                        window.confirm('This content has been removed from the platform. Resolved');
                                        window.location.reload();
                                        
                                      }}
                                    >
                                      Remove Content and send notif
                                    </button>
                                </Row>
                                <Row>
                                    <button
                                      disabled={this.state.disabled}
                                      className="btn btn-primary"
                                      onClick={() => {
                                        var url2="/routes/reports/remove/"+String(report._id);
                                        axios.delete(url2);
                                        var url3= "routes/resolvedReport";
                                        axios.post(url3, {
                                          contentType: report.contentType,
                                          identifier: report.identifier,
                                          reportedby: report.reportedby,
                                          postedby: report.postedby,
                                          title: report.title,
                                          description: report.description,
                                          resolutionStatus: "allowed",
                                        });
                                        window.confirm('This content has not been removed from the platform. Resolved.');
                                        window.location.reload();

                                      }}
                                    >
                                      Allow Content and send notif
                                    </button>
                                </Row>    
                            </Col>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
export default Questions;
