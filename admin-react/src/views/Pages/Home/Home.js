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

const conn = require("../../../config/connection");
const BaseURL = conn.BaseURL;

function Home() {

  return (
    <>
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <a href="/salon">
                    <p> Salon Room </p>
                  </a>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <a href="/contents">
                    <p> Salon Contents </p>
                  </a>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        {/* <Button color="danger" onClick={e => onSignOut(e)}>Sign Out</Button> */}
      </Container>
    </div>
    </>
  );
}

export default Home;
