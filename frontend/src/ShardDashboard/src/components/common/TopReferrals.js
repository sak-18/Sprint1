import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  CardFooter,
  Row,
  Col,
  FormSelect,
} from "shards-react";
import axios from "axios";

class TopReferrals extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "Top Courses", referralData: [] };
  }
  async componentDidMount() {
    //const courses = (await axios.get("/routes/courses/desc/sort")).data;
    //console.log(courses);
    await axios.get("/routes/courses/desc/sort").then((res) => {
      console.log(res);

      let courses = [];
      res.data.courses.forEach((course) => {
        courses.push({
          title: course["title"],
          value: course["averagerating"],
        });
      });
      this.setState({
        referralData: courses,
      });
    });
  }
  render() {
    return (
      <>
        <Card small>
          <CardHeader className="border-bottom">
            <h6 className="m-0">{this.state.title}</h6>
            <div className="block-handle" />
          </CardHeader>

          <CardBody className="p-0">
            <ListGroup small flush className="list-group-small">
              {this.state.referralData.map((item, idx) => (
                <ListGroupItem key={idx} className="d-flex px-3">
                  <span className="text-semibold text-fiord-blue">
                    {item.title}
                  </span>
                  <span className="ml-auto text-right text-semibold text-reagent-gray">
                    {item.value}
                  </span>
                </ListGroupItem>
              ))}
            </ListGroup>
          </CardBody>
        </Card>
      </>
    );
  }
}

TopReferrals.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The referral data.
   */
  referralData: PropTypes.array,
};
TopReferrals.defaultProps = {
  title: "Top Courses",
  referralData: [],
};
/*
TopReferrals.defaultProps = {
  title: "Top Courses",
  referralData: [
    {
      title: "GitHub",
      value: "19,291",
    },
    {
      title: "Stack Overflow",
      value: "11,201",
    },
    {
      title: "Hacker News",
      value: "9,291",
    },
    {
      title: "Reddit",
      value: "8,281",
    },
    {
      title: "The Next Web",
      value: "7,128",
    },
    {
      title: "Tech Crunch",
      value: "6,218",
    },
    {
      title: "YouTube",
      value: "1,218",
    },
    {
      title: "Adobe",
      value: "1,171",
    },
  ],
};
*/
export default TopReferrals;
