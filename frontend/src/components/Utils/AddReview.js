import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class AddReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      title: "",
      description: "",
    };
  }

  updateDescription(value) {
    this.setState({
      description: value
    });
  }

  updateTitle(value) {
    this.setState({
      title: value
    });
  }
  updateRating(value){
      this.setState({
          rating: value
      });
  }

  async submit() {
    this.setState({
      disabled: true,
    });

    await axios.post("/routes/reviews", {
      // ********************CHANGED "http://localhost:4000" WORKING
      title: this.state.title,
      description: this.state.description,
      rating: this.state.rating,
    });

    this.props.history.push("/courses/ISF341");
  }

    
    //   await axios.post("http://localhost:4000", {
    //     title: this.state.title,
    //     description: this.state.description,
        
    //   });
  
    //   this.props.history.push("/courses/ISF341");
    // }
  
  
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
                    onBlur={e => {
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
                    onBlur={e => {
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
                    onBlur={e => {
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(AddReview);






















