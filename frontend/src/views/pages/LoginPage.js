import React, { Component } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { GoogleLogin } from "react-google-login";
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
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavLink,
  Container,
  Col,
} from "reactstrap";
import "../../assets/css/LoginPage.css";
// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import { PostData } from "../../services/PostData";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

/*
const responseGoogle = (response) => {
  console.log(response);
  this.signup(response, "google");
};
*/

/*
class GoogleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
    };
    this.signup = this.signup.bind(this);
  }

  signup(res, type) {
    PostData("login", this.state).then((result) => {
      let responseJson = result;
      if (responseJson.userData) {
        sessionStorage.setItem("userData", JSON.stringify(responseJson));
        this.setState({ redirectToReferrer: true });
      }
    });
  }

  render() {
    if (this.state.redirectToReferrer) {
      return <Redirect to={"/home"} />;
    }
    const responseGoogle = (response) => {
      console.log(response);
      this.signup(response, "google");
    };

    return (
      <>
        <GoogleLogin
          clientId="978769481338-f5mg1lb2p50mo64sa6eb4860he6n4smv.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </>
    );
  }
}
*/

function LoginPage(props) {
  var responseGoogle = (response) => {
    //console.log(response);
    //console.log(response.profileObj);
    //return <Redirect to="/discussion-page"></Redirect>;
    //history.push("/discussion-page");
    window.response = response;
    history.push({
      pathname: "/discussion-page",
      customNameData: response,
    });
  };
  let history = useHistory();
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
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
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("../../assets/img/now-logo.png")}
                      ></img>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="Usrnm"
                        placeholder="User Name"
                        type="text"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="pswd"
                        placeholder="Password"
                        type="text"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle caret>User Type</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Choose an item</DropdownItem>
                        <DropdownItem>Student</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Teacher</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Admin</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>

                    <div>
                      <GoogleLogin
                        clientId="978769481338-f5mg1lb2p50mo64sa6eb4860he6n4smv.apps.googleusercontent.com"
                        buttonText="Google Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                    </div>

                    <div margin="0px" className="pull-left">
                      <h6>
                        <a className="link" href="/register-page">
                          Create Account
                        </a>
                      </h6>
                    </div>
                    <div margin="0px" className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div>
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

export default LoginPage;
