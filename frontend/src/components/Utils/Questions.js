import React, { Component } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { get, groupBy, pick, sortBy } from "lodash";

import ButtonToolbar from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import TimeAgo from "react-timeago";


import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Button from "react-bootstrap/Button";
class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: null,
      //match: null
    };
  }
  dummy() {

  }
 
  async componentDidMount() {
    const questions = (await axios.get("/routes/questions")).data; // WORKING********************CHANGED "http://localhost:4000/"
    this.setState({
      questions,
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

  render() {
    return (
      <div className="container">
        <Link to="discussion-page/new-question">
          <div className="card text-white bg-secondary mb-3">
            <div className="card-header">Need help? Ask here!</div>
            <div className="card-body">
              <h4 className="card-title">+ New Question</h4>
              <p className="card-text">Don't worry. Help is on the way!</p>
            </div>
          </div>
        </Link>
        <p> Sort By </p>
        <small className="text-muted">
          Default: Most recent last
        </small>
        <br/>
        
        {this.state.questions ? (
          <ButtonToolbar style={{ marginBottom: "5px", marginLeft: "10px" }}>
            <ToggleButtonGroup
              type="radio"
              name="options"
              size="sm"
              defaultValue={2}
              onChange={value => {
                let questions = [...this.state.questions];
                let sortFunc = param => (a, b) => {
                  if (get(a, param) === get(b, param)) return 0;
                  return get(a, param) > get(b, param) ? -1 : 1;
                };
                questions.sort(sortFunc("time"));
                switch (value) {
                  case 1: {
                    questions.sort(sortFunc("time"));
                    break;
                  }
                  case 2: {
                    questions.sort(sortFunc("upvotes"));
                    break;
                  }
                  
                  default: {
                    questions.sort(sortFunc("time"));
                    break;
                  }
                }
                this.setState({ questions: questions });
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
          {this.state.questions === null && <p>Loading questions...</p>}
          {this.state.questions &&
            this.state.questions.map((question) => (
              <div key={question._id} className="col-sm-12 col-md-10 col-lg-12">
                <Link to={`/discussion-page/question/${question._id}`}>
                  <div className="card text-dark shadow p-4 mb-3 bg-light">
                    
                    <div className="card-body">
                    <div key={question._id} className="container">
                      <Container>
                        <Row>
                          <Col lg={10}>
                            <Row>
                              <Col style={{ wordWrap: "break-word" }}>
                              <h3 className="card-title">{question.title}</h3>
                              <h4 className="card-text">{question.description}</h4>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={7}>
                                <Row>
                                  <Col>
                                    
                                      <p>Submitted by {question.postedby}</p>
                                      <small className="text-muted">
                                      <TimeAgo date={question.time} />
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
                                    Upvote ({this.state.question.upvotes})
                                  </ToggleButton>
                                  <ToggleButton
                                    value="down"
                                    variant="outline-danger"
                                    size="sm"
                                  >
                                    Downvote ({this.state.question.downvotes})
                                  </ToggleButton>
                                </ToggleButtonGroup>
                              </Col> */}
                            </Row>
                            <div className="card-header">
                              Answers: {question.answers.length}
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </div>

                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
export default Questions;
