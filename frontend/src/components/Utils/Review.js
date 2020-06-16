import React, { Component } from "react";
import axios from "axios";
import TimeAgo from "react-timeago";


import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Button from "react-bootstrap/Button";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: null,
      courseid: props.courseid,
    };
  }

  async componentDidMount() {
    await this.refreshReview();
  }

  async refreshReview() {
    const {
      match: { params },
    } = this.props;
    var url_2 =
      "/routes/reviews/" + this.state.courseid + "/" + String(params.reviewId);
    console.log(url_2);
    const review = (await axios.get(url_2)).data;
    this.setState({
      review,
    });
  }
  dummy() {

  }
  render() {
    const { review } = this.state;
    if (review === null) return <p>Looks empty here. </p>;
    return (
      <div className="container">
        <div className="card text-dark shadow p-4 mb-3 bg-light">
                    
                    <div className="card-body">
                    <div key={review._id} className="container">
                      <Container>
                        <Row>
                          <Col lg={4} style={{ marginBottom: "auto", marginTop: "auto" }}>
                            <Row>
                              <Col lg={4}>
                                
                                  <Button variant="success" size="lg" block disabled>
                                    {review.rating}
                                  </Button>
                              </Col>
                              
                            </Row>
                          </Col>
                          <Col lg={8}>
                            <Row>
                              <Col style={{ wordWrap: "break-word" }}>
                              <h3 className="card-title">{review.title}</h3>
                              <h4 className="card-text">{review.description}</h4>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={7}>
                                <Row>
                                  <Col>
                                    
                                      <p>Submitted by {review.postedby}</p>
                                      <small className="text-muted">
                                      <TimeAgo date={review.time} />
                                    </small>
                                  </Col>
                                </Row>


                                <Row>
                                  <Col>
                                    <small className="text-muted">
                                      <Button
                                        variant="info"
                                        size="sm"
                                        onClick={    this.dummy()     }
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
                                    Upvote ({this.state.review.upvotes})
                                  </ToggleButton>
                                  <ToggleButton
                                    value="down"
                                    variant="outline-danger"
                                    size="sm"
                                  >
                                    Downvote ({this.state.review.downvotes})
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
    );
  }
}

export default Review;
