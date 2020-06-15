import React, {  Component, Fragment } from "react";
import axios from "axios";
import { getDecodedToken } from "../../utils/jwt";
import Answers from "./Answers";

class Question extends Component {
  constructor(props) {
    super(props);
    this.user = getDecodedToken();
    this.state = {
      question: null,
      postedby:"Anonymous Student",
      answer: "",
    };
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

    this.props.history.push("/discussion-page");
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

    this.props.history.push("/discussion-page");
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
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{question.title}</h1>
            <p className="lead">{question.description}</p>
            <hr className="my-4" />
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
                this.submitAnswer();
              }}
            >
              Submit
            </button>

            <br/>

            <button
              disabled={this.state.disabled}
              className="btn btn-primary"
              onClick={() => {
                this.submitAnswerAnonymously();
              }}
            >
              Submit Anonymously
            </button>
            <hr className="my-4" />
            </Fragment>
            <p>Answers:</p>
            <Answers questionId={qid}/>
            
              {/* a list of all answers here  */}



            {/* {question.answers.map((answer, idx) => (
              <p className="lead" key={idx}>
                {answer}
              </p>
            ))} */}
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
