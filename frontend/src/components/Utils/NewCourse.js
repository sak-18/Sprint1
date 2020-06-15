import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class NewCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      title: "",
      description: "",
      courseid:"",
      instructor:"",
    };
  }

  updateDescription(value) {
    this.setState({
      description: value,
    });
  }
  updateinstructor(value) {
    this.setState({
      instructor: value,
    });
  }
  updatecourseid(value) {
    this.setState({
      courseid: value,
    });
  }
  updateTitle(value) {
    this.setState({
      title: value,
    });
  }

  async submit() {
    this.setState({
      disabled: true,
    });

    await axios.post("/routes/courses", {
      // ********************CHANGED "http://localhost:4000" WORKING
      courseid: this.state.courseid,
      instructor:this.state.instructor,
      title: this.state.title,
      description: this.state.description,
    });

    this.props.history.push("/admin-page");
  }

  render() {
    return (
      <div style={{ marginTop: "100px" }} className="container">
        <div className="row">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-header">New Course</div>
              <div className="card-body text-left">
              <div className="form-group">
                  <label htmlFor="exampleInputEmail1">courseid:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {
                      this.updatecourseid(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Enter CourseID"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {
                      this.updateTitle(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Give your course a title."
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
                    placeholder="Give more description of the course"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Instructor:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => {
                      this.updateinstructor(e.target.value);
                    }}
                    className="form-control"
                    placeholder="Who is the instructor?"
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

export default withRouter(NewCourse);
