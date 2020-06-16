import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function CourseHomeHeader(props) {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../../assets/img/back2.jpg") + ")",
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <h3 className="title">
            {props.courseid} - {props.title}
          </h3>
          <p className="category">{props.instructor}</p>
        </Container>
      </div>
    </>
  );
}

export default CourseHomeHeader;
