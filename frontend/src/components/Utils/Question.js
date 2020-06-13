import React, { Component } from "react";
import axios from "axios";
import SubmitAnswer from "./SubmitAnswer.js"; //

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
    };

    this.submitAnswer = this.submitAnswer.bind(this); //
  }

  async componentDidMount() {
    await this.refreshQuestion();
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

  async submitAnswer(answer) {
    if (answer === "") {
      alert("Empty response");
    }
    var url_2 = "/routes/questions/answer/" + String(this.state.question._id);
    console.log(url_2);
    await axios.post(
      url_2, // ********************CHANGED `http://localhost:4000/answer/${this.state.question._id}`
      {
        answer,
      }
    );
    await this.refreshQuestion();
  }

  render() {
    const { question } = this.state;
    if (question === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{question.title}</h1>
            <p className="lead">{question.description}</p>
            <hr className="my-4" />
            <SubmitAnswer
              questionId={question._id}
              submitAnswer={this.submitAnswer}
            />
            <p>Answers:</p>
            {question.answers.map((answer, idx) => (
              <p className="lead" key={idx}>
                {answer}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
