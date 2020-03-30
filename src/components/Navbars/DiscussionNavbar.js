import React from "react";
import { Link } from "react-router-dom";
import "assets/css/DiscussionNavbar.css";
function DiscussionNavBar() {
  return (
    <nav className="navbar navbar-dark bg-secondary fixed-top discussion-nav">
      <Link className="navbar-brand" to="/">
        Q&App
      </Link>
    </nav>
  );
}

export default DiscussionNavBar;
