import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { getDecodedToken } from "../../utils/jwt";

class SubmitAnswer extends Component {
  constructor(props) {
    super(props);
    this.user = getDecodedToken();
    this.state = {
      postedby:"Anonymous Student",
      answer: "",
    };
  }

  updateAnswer(value) {
    this.setState({
      answer: value,
    });
  }

  async submitAnonymously() {
    this.setState({
      disabled: true,
    });

    await axios.post("/routes/questions", {
      questionid: this.state.title,
      postedby: "Anonymous Student",
      answer: this.state.answer,
    });

    this.props.history.push("/discussion-page");
  }
  async submit() {
    this.setState({
      disabled: true,
    });

    await axios.post("/routes/questions", {
      questionid: this.state.title,
      postedby: this.user.name,
      answer: this.state.answer,
    });

    this.props.history.push("/discussion-page");
  }
  

  render() {
    return (
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
        <button
          className="btn btn-primary"
          onClick={() => {
            this.submit();
          }}
        >
          Submit
        </button>


        <br/>

        <button
          disabled={this.state.disabled}
          className="btn btn-primary"
          onClick={() => {
            this.submitAnonymously();
          }}
        >
          Submit Anonymously
        </button>
        <hr className="my-4" />
      </Fragment>
    );
  }
}

export default withRouter(SubmitAnswer);
