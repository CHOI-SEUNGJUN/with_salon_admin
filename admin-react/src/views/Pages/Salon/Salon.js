import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";

import SalonRoomTable from "./SalonRoomTable"
import axios from "axios";

const conn = require("../../../config/connection");
const BaseURL = conn.BaseURL;

const CreateNewSalonEndPoint = BaseURL + "api/v1/salon/";

function Salon() {

  const initSalon = {
    roomName: "",
    category: "",
    password: "",
    progressDate: ""
  }

  const [salon, setSalon] = useState(initSalon);
  const [isNewSalon, setIsNewSalon] = useState(0);

  const postSalon = async (newSalon) => {
    const callApi = async () => {
      let post_conf = {
        headers: {
          "Content-Type": "application/json",
          token: "withlining",
        },
      };

      const { data: res } = await axios.post(CreateNewSalonEndPoint, newSalon, post_conf)

      return res;
    }

    callApi();
  }

  const submitHandler = async () => {
    let newSalon = salon;
    console.log(salon)
    
    await postSalon(newSalon);
    // reset Salon object as a default.
    setSalon({...initSalon});
  }

  const inputChangeHandler = async (event) => {

    let { name, value } = event.target;
    let newSalon = salon;
    await setSalon({ ...newSalon, [name]: value });
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Card>
          <CardHeader>
            <strong>새 살롱 룸 생성</strong>
          </CardHeader>
          <CardBody>
            <Form className="form-horizontal"
              onSubmit={(event) => {
                event.preventDefault();
                submitHandler();
                return false;
              }}>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="text-input">룸 이름</Label>
                </Col>
                <Col xs="12" md="10">
                  <Input
                    type="text"
                    id="room-name-input"
                    name="roomName"
                    onChange={inputChangeHandler}
                    value={salon.roomName}
                    required />
                  <FormText color="muted">
                    새 살롱 룸 이름을 입력해주세요.
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="text-input">카테고리</Label>
                </Col>
                <Col xs="12" md="10">
                  <Input
                    type="text"
                    id="room-category-input"
                    name="category"
                    onChange={inputChangeHandler}
                    value={salon.category}
                    required />
                  <FormText color="muted">
                    카테고리를 입력해주세요.
                    <b> 사랑=1, 인간관계=2, 인생=3, 행복=4</b>
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="text-input">비밀번호</Label>
                </Col>
                <Col xs="12" md="10">
                  <Input
                    type="text"
                    id="room-password-input"
                    name="password"
                    onChange={inputChangeHandler}
                    value={salon.password}
                    required />
                  <FormText color="muted">
                    비밀번호를 입력해주세요.
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="text-input">살롱날짜</Label>
                </Col>
                <Col xs="12" md="10">
                  <Input
                    type="text"
                    id="room-progressdate-input"
                    name="progressDate"
                    onChange={inputChangeHandler}
                    value={salon.progressDate}
                    required />
                  <FormText color="muted">
                    살롱날짜 (YYYY-MM-DD)
                    <b> 필수!! 2020-07-15 형식 지키셈!</b>
                  </FormText>
                </Col>
              </FormGroup>
              <div style={{textAlign: "right"}}>
                <Button 
                  id="filter"
                  type="submit"
                  size="sm"
                  color="primary"
                ><i className="fa fa-dot-circle-o"></i> 등록
                </Button>
                <Button 
                  id="filter"
                  type="reset" size="sm" color="danger" onClick={() => setSalon({...initSalon})}>
                  <i className="fa fa-ban"></i> 초기화
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* <Button color="primary">Create New</Button> */}
      </Row>
      <Row>
        <Col xl={12}>
          <SalonRoomTable />
        </Col>
      </Row>
    </div>
  );
}

export default Salon;
