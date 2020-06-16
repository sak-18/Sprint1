            <div key={review._id}>
              <Link to={`/courses/ISF341/review/${review._id}`}></Link>
              <Container>
                <Row>
                  <Col lg={4} style={{ marginBottom: "auto", marginTop: "auto" }}>
                    <Row>
                      <Col lg={2}>
                        <h2>
                          {review.rating}
                        </h2>
                      </Col>
                      
                    </Row>
                  </Col>
                  <Col lg={8}>
                    <Row>
                      <Col style={{ wordWrap: "break-word" }}>
                      <h4 className="card-title">{review.title}</h4>
                      <p className="card-text">{review.description}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={7}>
                        <Row>
                          <Col>
                            <small className="text-muted">
                              <p>Submitted by {review.postedby}</p>
                              <TimeAgo date={review.time} />
                            </small>
                          </Col>
                        </Row>


                        <Row>
                          <Col>
                            <small className="text-muted">
                              <Button
                                variant="link"
                                size="sm"
                                onClick={       }
                              >
                              Report
                              </Button>
                            </small>
                          </Col>
                        </Row>


                        
                      </Col>


                      <Col lg={5}>
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
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
              <hr />
            </div>

