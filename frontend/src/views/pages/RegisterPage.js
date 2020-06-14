<<<<<<< HEAD
import React from "react";

// reactstrap components
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";

function RegisterPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [dropdownOpen, setOpen] = React.useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage:
              "url(" + require("../../assets/img/login.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <CardTitle className="title-up" tag="h3">
                      Sign Up
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border" + (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Name"
                        type="text"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border" + (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="ID Number"
                        type="text"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border" + (emailFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons ui-1_email-85"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email..."
                        type="text"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle caret>Select a User Type</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>User type:</DropdownItem>
                        <DropdownItem>Student</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Teacher</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Admin</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>

                    <Button
                      className="btn-neutral btn-round"
                      color="info"
                      href="/profile-page"
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
      </div>
    </>
  );
}

=======
import React, { Component } from "react";
import { Link } from "react-router-dom";
// require("dotenv").config();

// reactstrap components
import { GoogleLogin } from "react-google-login";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Form,
  Container,
  Col,
} from "reactstrap";
import "../../assets/css/LoginPage.css";
// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import { Redirect } from "react-router-dom";

import { postuserandgetToken, checkToken } from "../../utils/jwt";

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: checkToken(),
      failed: false
    };
  }

  render() {
    let responseGoogle = (response) => {
        var mail=response.profileObj.email;
        var name=response.profileObj.name;
        var photo=response.profileObj.imageUrl;
        console.log(mail);
        console.log(name);
        console.log(photo);
        postuserandgetToken(name,mail,photo, (err, token) => {
          if (err) {
            return this.setState({
              failed: true
            });
          }
          this.props.setRouterToken(token);
          this.setState({ authenticated: true });
        });
      };
    let googleFailure = data => {
      this.setState({
        failed: true
      });
    };
    if (this.state.authenticated) {
      return <Redirect to="/discussion-page" />;
    } else {
      return (
        <>
          <ExamplesNavbar />
          <div className="page-header clear-filter" filter-color="blue">
            <div
              className="page-header-image"
              style={{
                backgroundImage:
                  "url(" + require("../../assets/img/login.jpg") + ")",
              }}
            ></div>
            <div className="content">
              <Container>
                <Col className="ml-auto mr-auto" md="4">
                  <Card className="card-login card-plain">
                    <Form action="" className="form" method="">
                      <CardHeader className="text-center">
                        <CardTitle className="title-up" tag="h3">
                          Sign Up
                        </CardTitle>
                      </CardHeader>
                      <CardBody>
                      <div>
                          <GoogleLogin
                            clientId="978769481338-f5mg1lb2p50mo64sa6eb4860he6n4smv.apps.googleusercontent.com"
                            buttonText="Google Login"
                            onSuccess={responseGoogle}
                            onFailure={googleFailure}
                            cookiePolicy={"single_host_origin"}
                          />
                      </div>
                      <font color="red">
                      {this.state.failed
                        ? "Please Refresh this page to go forward"
                        : ""}
                    </font>
                      </CardBody>
                    </Form>
                  </Card>
                </Col>
              </Container>
            </div>
          </div>
        </>
      );
    }
  }
}


>>>>>>> repo2/master
export default RegisterPage;
