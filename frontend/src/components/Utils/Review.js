import React, { Component } from "react";
import axios from "axios";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: null
    };
}

  async componentDidMount() {
    await this.refreshReview();
  }


  async refreshReview() {
    const {
      match: { params }
    } = this.props;
    var url_2="/routes/reviews/" + String(params.reviewId);
    console.log(url_2);
    const review = (
      await axios.get(url_2)
    ).data;
    this.setState({
      review,
    });
  }
  

  render() {
    const { review } = this.state;
    if (review === null) return <p>Looks empty here. </p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{review.title}</h1>
            <p className="lead">{review.description}</p>
            <p className="lead">{review.rating}</p>
            <hr className="my-4" />
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
