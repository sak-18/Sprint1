import React, { Component, Fragment } from "react";
import axios from "axios";
import { getDecodedToken } from "../../utils/jwt";
import Answers from "./Answers";
import TimeAgo from "react-timeago";
import { Link, useRouteMatch } from "react-router-dom";


import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Button from "react-bootstrap/Button";


class Question extends Component {
  constructor(props) {
    super(props);
    this.user = getDecodedToken();
    this.state = {
      question: null,
      postedby: "Anonymous Student",
      answer: "",
    };
  }
  dummy() {

  }
  async componentDidMount() {
    await this.refreshQuestion();
  }
  updateAnswer(value) {
    this.setState({
      answer: value,
    });
  }

  async refreshQuestion() {
    const {
      match: { params },
    } = this.props;
    var url_1 = "/routes/questions/" + String(params.questionId);
    console.log(url_1);
    const question = (await axios.get(url_1)).data; // ********************CHANGED `http://localhost:4000/${params.questionId}`
    this.setState({
      question,
    });
  }

  async submitAnswer() {
    this.setState({
      disabled: true,
    });

    var url_2 = "/routes/answers/" + String(this.state.question._id);
    console.log(url_2);
    await axios.post(url_2, {
      postedby: this.user.name,
      answer: this.state.answer,
    });

    this.props.history.push("/discussion-page/");
  }
  async submitAnswerAnonymously() {
    this.setState({
      disabled: true,
    });

    var url_2 = "/routes/answers/" + String(this.state.question._id);
    console.log(url_2);
    await axios.post(url_2, {
      postedby: this.state.postedby,
      answer: this.state.answer,
    });

    this.props.history.push("/discussion-page/");
  }

  render() {
    const {
      match: { params },
    } = this.props;
    var qid = String(params.questionId);
    const { question } = this.state;
    if (question === null) return <p>Loading ...</p>;
    return (
      <div className="container">
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

            
            <Fragment>
              <div className="form-group text-center">
                <label htmlFor="exampleInputEmail1">Answer:</label>
                <input
                  type="text"
                  onChange={(e) => {
                    this.updateAnswer(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Share your answer."
                  value={this.state.answer}
                />
              </div>
              <hr/>
              <Col>
              <button
                className="btn btn-primary"
                onClick={() => {
                  this.submitAnswer();
                }}
              >
                Submit
              </button>
              <button
                disabled={this.state.disabled}
                className="btn btn-primary"
                onClick={() => {
                  this.submitAnswerAnonymously();
                }}
              >
                Submit Anonymously
              </button>
              </Col>
              <hr className="my-4" />
            </Fragment>
            <h2>Answers:</h2>
            <Answers questionId={qid} />
      </div>
    );
  }
}

export default Question;
