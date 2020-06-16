import React, { Component } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { get, groupBy, pick, sortBy } from "lodash";

import ButtonToolbar from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

import TimeAgo from "react-timeago";

import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: null,
      //match: null
    };
  }
  dummy() {

  }
  async componentDidMount() {
      var url="/routes/answers/" + String(this.props.questionId);
    const answers = (await axios.get(url)).data; // WORKING********************CHANGED "http://localhost:4000/"
    this.setState({
      answers,
    });
  }

  render() {
    return (
      <div className="container">
      <p> Sort By </p>
                <small className="text-muted">
                  Default: Most recent last
                </small>
                <br/>
                
                {this.state.answers ? (
                  <ButtonToolbar style={{ marginBottom: "5px", marginLeft: "10px" }}>
                    <ToggleButtonGroup
                      type="radio"
                      name="options"
                      size="sm"
                      defaultValue={2}
                      onChange={value => {
                        let answers = [...this.state.answers];
                        let sortFunc = param => (a, b) => {
                          if (get(a, param) === get(b, param)) return 0;
                          return get(a, param) > get(b, param) ? -1 : 1;
                        };
                        answers.sort(sortFunc("time"));
                        switch (value) {
                          case 1: {
                            answers.sort(sortFunc("time"));
                            break;
                          }
                          case 2: {
                            answers.sort(sortFunc("upvotes"));
                            break;
                          }
                          
                          default: {
                            answers.sort(sortFunc("time"));
                            break;
                          }
                        }
                        this.setState({ answers: answers });
                      }}
                    >
                      <ToggleButton variant="outline-primary" value={1}>
                        Most Recent
                      </ToggleButton>
                      <ToggleButton variant="outline-primary" value={2}>
                        Most Upvoted
                      </ToggleButton>
                      
                    </ToggleButtonGroup>
                  </ButtonToolbar>
                ) : null}
        <div className="row">
          {this.state.answers === null && <p>Loading answers...</p>}
          {this.state.answers &&
            this.state.answers.map((answer) => (
              <div key={answer._id} className="col-sm-6 col-md-8 col-lg-10">
                  <div className="card text-dark shadow p-4 mb-3 bg-light">
                    
                    <div className="card-body">
                    <div key={answer._id} className="container">
                      <Container>
                        <Row>
                          <Col lg={10}>
                            <Row>
                              <Col style={{ wordWrap: "break-word" }}>
                              <h3 className="card-title">{answer.answer}</h3>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={7}>
                                <Row>
                                  <Col>
                                    
                                      <p>Submitted by {answer.postedby}</p>
                                      <small className="text-muted">
                                      <TimeAgo date={answer.time} />
                                    </small>
                                  </Col>
                                </Row>


                                <Row>
                                  <Col>
                                    <small className="text-muted">
                                      <Button
                                        variant="info"
                                        size="sm"
                                        onClick={    this.dummy()   }
                                      >
                                      Report
                                      </Button>
                                    </small>
                                  </Col>
                                </Row>


                                
                              </Col>


                              {/* <Col lg={5}>
                                <ToggleButtonGroup
                                >
                                  <ToggleButton
                                    value="up"
                                    variant="outline-success"
                                    size="sm"
                                  >
                                    Upvote ({this.state.answer.upvotes})
                                  </ToggleButton>
                                  <ToggleButton
                                    value="down"
                                    variant="outline-danger"
                                    size="sm"
                                  >
                                    Downvote ({this.state.answer.downvotes})
                                  </ToggleButton>
                                </ToggleButtonGroup>
                              </Col> */}
                            </Row>
                            
                          </Col>
                        </Row>
                      </Container>
                    </div>

                    </div>
                  </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Answers;
