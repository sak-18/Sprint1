import React, { Component } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null
    };
  }

  async componentDidMount() {
    const reviews = (await axios.get("/routes/reviews")).data;
    this.setState({
      reviews
    });
  }


  render() {
    return (
      <div className="container">
        <Link to="/courses/ISF341/add-review">
          <div className="card text-white bg-secondary mb-3">
            <div className="card-header mb-3 align-middle">  Share Your Experience with this course</div>
            <div className="card-body">
              <h4 className="card-title">+ New Review</h4>
            </div>
          </div>
        </Link>
        <div className="row">
          {this.state.reviews === null && <p>Looks Empty in here!</p>}
          {this.state.reviews &&
            this.state.reviews.map(review => (
              <div key={review._id} className="col-sm-12 col-md-6 col-lg-12">
                <Link to={`/courses/ISF341/review/${review._id}`}>
                  <div className="card text-dark shadow p-4 mb-3 bg-light">
                    
                    <div className="card-body">
                      <h4 className="card-title">{review.title}</h4>
                      <p className="card-text">{review.description}</p>
                      <p className="card-text">{review.rating}</p>

                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Reviews;
