import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import axios from "axios";

const conn = require("../../../config/connection");
const BaseURL = conn.BaseURL;

const SigninEndPoint = BaseURL + "api/v1/auth/sign-in";

function Signin({authenticated, authenticatedHandler, location}) {

  const [user, setUser] = useState({
    email: "",
    password: "",
    isAdmin: false,
  });
  const [isSubmit, setIsSubmit] = useState(0);

  useEffect(() => {
    // console.log("/Login hereee", window.sessionStorage.getItem('isAdmin'));
    if (window.sessionStorage.getItem('isAdmin') === "true") {
      // console.log("logged");
      const p = async () => {

        await setUser({email: window.sessionStorage.getItem('id'),isAdmin:true})
        authenticatedHandler(user, location.state || {from: {pathname: "/"}}, true)
      }
    }
  })

  useEffect(() => {
    // console.log("login button clicked", isSubmit);
    if (isSubmit) {
      axios.post(SigninEndPoint, user).then(res => {
        // console.log(res);
        // console.log("rddisadmin: ", res.data.data.isAdmin);
        if(res.status == 200) {
          // console.log("authenticatedHandler, ", user);

          let adminUser = user;
          adminUser.isAdmin = true;
          setUser({ ...adminUser});
          //authenticatedHandler(adminUser, location.state || { from: {pathname: "/" } }, true);
          // console.log("authenticatedHandler admin, ", user, adminUser);

          authenticatedHandler(user, location.state || { from: {pathname: "/" } }, true);
        }
      });
    }
  }, [isSubmit]);

  const inputChangeHandler = async (event) => {
    let { name, value } = event.target;
    let newUser = user;
    setUser({ ...newUser, [name]: value });
    //console.log(info);
  };

  const { from } = location.state || { from: { pathname: "/" } };
  if (authenticated) {
    // console.log("Redirecting to : ", from);
    from.ceo = user;
    from.authenticated = true;
    return <Redirect to={from} />;
  }

  return (
    <>
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form
                    onSubmit={(event) => {
                      event.preventDefault();
                      setIsSubmit(isSubmit + 1)
                    }}>
                    <h1>Admin Page</h1>
                    <p className="text-muted">위드살롱 관리자 페이지 로그인</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user">아 이 디</i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        name="email"
                        autoComplete="username"
                        onChange={inputChangeHandler}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock">비밀번호</i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        onChange={inputChangeHandler}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button
                          type="submit"
                          color="primary"
                          className="px-4"
                        >
                          로그인
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
}

export default Signin;
