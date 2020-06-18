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
      questions: null,
    };
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
  dummy(){

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
                <div className="card text-dark shadow p-4 mb-3 bg-light">
                  <div className="card-body">
                    <Container>
                      <Row>
                        <Col>
                          <Link to={`/discussion-page/question/${question._id}`}>
                            <div className="card text-dark shadow p-4 mb-3 bg-light">
                              <Col style={{ wordWrap: "break-word" }}>
                                <h3 className="card-title">{question.title}</h3>
                                <h4 className="card-text">{question.description}</h4>
                                <p>Submitted by {question.postedby}</p>
                                <small className="text-muted">
                                  <TimeAgo date={question.time} />
                                </small>
                              </Col>
                            </div>
                          </Link>

                          <Row>
                            <Col
                              style={{
                                marginBottom: "auto",
                                marginTop: "auto",
                              }}
                            >
                              <small className="text-muted">
                                    <button
                                      className="info"
                                      onClick={() => {
                                        var url="/routes/reports/";
                                        axios.post(url, {
                                          contentType:"question",
                                          identifier:question._id,
                                          title:question.title,
                                          description: question.description,
                                          postedby: question.postedby,
                                          reportedby:this.user.name
                                        });
                                        window.confirm('Reported Successfully');
                                      }}
                                    >
                                      Report
                                    </button>
                                  </small>
                            </Col>
                            <Col>
                              <button
                                disabled={this.state.disabled}
                                className="btn btn-primary"
                                onClick={() => {
                                  var url="/routes/questions/upvote/"+String(question._id);
                                  axios.post(url, {
                                    email: this.user.email,
                                  });
                                  window.location.reload();
                                }}
                              >
                                Upvote ({question.upvotedby.length})
                              </button>
                              <button
                                disabled={this.state.disabled}
                                className="btn btn-primary"
                                onClick={() => { 
                                  var url="/routes/questions/downvote/"+String(question._id);
                                  axios.post(url, {
                                    email: this.user.email,
                                  });
                                  window.location.reload();
                                }}
                              >
                                Downvote ({question.downvotedby.length})
                              </button>
                            </Col>
                          </Row>
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
