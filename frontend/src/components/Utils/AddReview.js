import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import axios from "axios";
import { getDecodedToken } from "../../utils/jwt";

class AddReview extends Component {
  constructor(props) {
    super(props);
    this.user = getDecodedToken();
    this.state = {
      disabled: false,
      title: "",
      courseid: props.courseid,
      postedby: "Anonymous Student",
      description: ""
    };
  }
  
  updatecourseid(value) {
    this.setState({
      courseid: value,
    });
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
  updateRating(value) {
    this.setState({
      rating: value,
    });
  }

  async submitAnonymously() {
    this.setState({
      disabled: true,
    });

    if(this.state.rating>=0 && this.state.rating<=5){

      const pass=Number(this.state.rating);
      var url="/routes/courses/update/"+String(this.props.courseid);
      console.log(url);
      console.log(pass);

      await axios.post(url, {
        rating: pass
      });

      await axios.post("/routes/reviews", {
        title: this.state.title,
        courseid: String(this.state.courseid),
        postedby: "Anonymous Student",
        description: this.state.description,
        rating: pass
      });
      this.props.history.push("/courses/" + this.state.courseid);
    }
    else{
      window.confirm('Please enter a rating between 0 & 5.');

      this.props.history.push("/courses/" + this.state.courseid);
    }
  }

  async submit() {
    this.setState({
      disabled: true,
    });
    if(this.state.rating>=0 && this.state.rating<=5){
      const pass=Number(this.state.rating);

      var url="/routes/courses/update/"+String(this.props.courseid);
      console.log(url);
      console.log(pass);
      await axios.post(url, {
        rating: pass
      });

      await axios.post("/routes/reviews", {
        title: this.state.title,
        courseid: String(this.state.courseid),
        postedby: this.user.name,
        description: this.state.description,
        rating: pass,
      });
      this.props.history.push("/courses/" + this.state.courseid);
    }
    else{
      window.confirm('Please enter a rating between 0 & 5.');

      this.props.history.push("/courses/" + this.state.courseid);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
          
            <div className="card border-primary">
              <div className="card-header">Add Review</div>
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
                    placeholder="Title."
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
                    placeholder="Give more context to your Review."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Rating:</label>
                  <input
                    disabled={this.state.disabled}
                    type="Number"
                    onBlur={(e) => {
                      this.updateRating(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Give the course  rating from 0 to 5."
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

export default withRouter(AddReview);
