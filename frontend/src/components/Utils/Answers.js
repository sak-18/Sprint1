import React, { Component } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: null,
      //match: null
    };
  }

  async componentDidMount() {
      var url="/routes/answers/" + String(this.props.questionId);
    const answers = (await axios.get(url)).data; // WORKING********************CHANGED "http://localhost:4000/"
    this.setState({
      answers,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.answers === null && <p>Loading Answers...</p>}
          {this.state.answers &&
            this.state.answers.map((answers) => (
                <div className="jumbotron col-12">
                
                  <div className="card text-dark shadow p-4 mb-3 bg-light">
                    
                    <div className="card-body">
                      <h3 className="card-title">{answers.answer}</h3>
                      <h4 className="card-text">{answers.postedby}</h4>
                    </div>
                  </div>
                
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Answers;
