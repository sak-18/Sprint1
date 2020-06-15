import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { getDecodedToken } from "../../utils/jwt";

class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.user = getDecodedToken();
    this.state = {
      disabled: false,
      title: "",
      postedby:"Anonymous Student",
      description: "",
    };
  }

  updateDescription(value) {
    this.setState({
      description: value,
    });
  }


  updateTitle(value) {
    this.setState({
      title: value,
    });
  }
  
  async submitAnonymously() {
    this.setState({
      disabled: true,
    });

    await axios.post("/routes/questions", {
      title: this.state.title,
      postedby: "Anonymous Student",
      description: this.state.description,
    });

    this.props.history.push("/discussion-page");
  }
  async submit() {
    this.setState({
      disabled: true,
    });

    await axios.post("/routes/questions", {
      // ********************CHANGED "http://localhost:4000" WORKING
      title: this.state.title,
      postedby: this.user.name,
      description: this.state.description,
    });

    this.props.history.push("/discussion-page");
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Question</div>
              <div className="card-body text-left">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {
                      this.updateTitle(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Give your question a title."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Description:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {
                      this.updateDescription(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Give more context to your question."
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {
                    this.submit();
                  }}
                >
                  Submit
                </button>
                <br />
                <button
                  disabled={this.state.disabled}
                  className="btn btn-primary"
                  onClick={() => {
                    this.submitAnonymously();
                  }}
                >
                  Submit Anonymously
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NewQuestion);
