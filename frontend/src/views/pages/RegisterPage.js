import React, { Component } from "react";
import { Link } from "react-router-dom";

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


export default RegisterPage;
