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

import { getToken, checkToken } from "../../utils/jwt";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: checkToken(),
      failed: false
    };
  }

  render() {
    var responseGoogle = (response) => {
        //console.log(response);
        var mail=response.profileObj.email;
        console.log(mail);
        getToken(mail, (err, token) => {
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
                  <div>
                      <GoogleLogin
                        clientId="978769481338-f5mg1lb2p50mo64sa6eb4860he6n4smv.apps.googleusercontent.com"
                        buttonText="Google Login"
                        onSuccess={responseGoogle}
                        onFailure={googleFailure}
                        cookiePolicy={"single_host_origin"}
                      />
                  </div>

                  </CardBody>
                  <font color="red">
                    {this.state.failed
                      ? "Please Refresh this page to go forward"
                      : ""}
                  </font>
                  <CardFooter className="text-center">
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
      );
    }
  }
}

export default LoginPage;
