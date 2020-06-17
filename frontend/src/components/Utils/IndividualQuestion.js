<div key={question._id} className="col-sm-12 col-md-10 col-lg-12">
                
                <div className="card text-dark shadow p-4 mb-3 bg-light">
                  
                  <div className="card-body">

                  <div key={question._id} className="container">
                    <Container>
                      <Row>
                        <Col lg={10}>
                        <Link to={`/discussion-page/question/${question._id}`}>
                          <Row>
                            <Col style={{ wordWrap: "break-word" }}>
                            <h3 className="card-title">{question.title}</h3>
                            <h4 className="card-text">{question.description}</h4>
                            </Col>
                          </Row>
                          </Link>
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
                            </Col>
                              <div class="row">
                                <div class="col">
                                  <small className="text-muted">
                                    <Button
                                      variant="info"
                                      size="sm"
                                      onClick={    this.dummy()   }
                                    >
                                    Report
                                    </Button>
                                  </small>
                                </div>
                                <div class="row justify-content-end">
                                <Col >
                                  <button
                                    disabled={this.state.disabled}
                                    className="btn btn-primary"
                                    onClick={() => {
                                      var url="/routes/questions/upvote/"+String(question._id);
                                      axios.post(url, {
                                        email: this.user.email,
                                      });
                                    }}
                                  >
                                    Upvote ({question.upvotedby.length})
                                  </button>
                                </Col>
                                <Col>
                                  <button
                                    disabled={this.state.disabled}
                                    className="btn btn-primary"
                                    onClick={() => {
                                      var url="/routes/questions/downvote/"+String(question._id);
                                      axios.post(url, {
                                        email: this.user.email,
                                      });
                                    }}
                                  >
                                    Downvote ({question.downvotedby.length})
                                  </button>
                                </Col>
                                </div>
                                
                              </div>
                            
                          </Row>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
              </div>
            </div>