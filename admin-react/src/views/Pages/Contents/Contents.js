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

import ContentsTable from "./ContentsTable"
import axios from "axios";

const conn = require("../../../config/connection");
const BaseURL = conn.BaseURL;

const CreateNewContentEndPoint = BaseURL + "api/v1/contents/";

function Contents() {

  const initContent = {
    category: "",
    pageNum: "",
    contentImageURI: "",
    questionImageURI: "",
    questionContent: "",
    popUpImageURI: "",
    popUpMessage: "",
  }

  const [content, setContent] = useState(initContent);

  const postContent = async (newContent) => {
    const callApi = async () => {
      let post_conf = {
        headers: {
          "Content-Type": "application/json",
          token: "withlining",
        },
      };

      const { data: res } = await axios.post(CreateNewContentEndPoint, newContent, post_conf)

      return res;
    }

    callApi();
  }

  const submitHandler = async () => {
    let newContent = content;
    
    await postContent(newContent);
    // reset Salon object as a default.
    setContent({...initContent});
  }

  const inputChangeHandler = async (event) => {

    let { name, value } = event.target;
    let newContent = content;
    await setContent({ ...newContent, [name]: value });

  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Card>
          <CardHeader>
            <strong>새 컨텐츠 생성</strong>
          </CardHeader>
          <CardBody>
            <Form className="form-horizontal"
              onSubmit={(event) => {
                //event.preventDefault();
                submitHandler();
                return false;
              }}>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="text-input">카테고리(숫자)</Label>
                </Col>
                <Col xs="12" md="10">
                  <Input
                    type="text"
                    id="content-category-input"
                    name="category"
                    onChange={inputChangeHandler}
                    value={content.category}
                    required />
                  <FormText color="muted">
                    사랑=1, 인간관계=2, 인생=3, 행복=4
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="text-input">페이지 번호</Label>
                </Col>
                <Col xs="12" md="10">
                  <Input
                    type="text"
                    id="content-page-num-input"
                    name="pageNum"
                    onChange={inputChangeHandler}
                    value={content.pageNum}
                    required />
                  <FormText color="muted">
                    새 컨텐츠의 페이지 번호를 입력해주세요.(겹치지 않게 작성)
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="text-input">이미지 주소</Label>
                </Col>
                <Col xs="12" md="10">
                  <Input
                    type="text"
                    id="content-image-uri-input"
                    name="contentImageURI"
                    onChange={inputChangeHandler}
                    value={content.contentImageURI}
                    required />
                  <FormText color="muted">
                    새 컨텐츠의 이미지 주소를 입력해주세요.
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="text-input">질문 이미지 주소</Label>
                </Col>
                <Col xs="12" md="10">
                  <Input
                    type="text"
                    id="content-question-image-uri-input"
                    name="questionImageURI"
                    onChange={inputChangeHandler}
                    value={content.questionImageURI}
                     />
                  <FormText color="muted">
                    새 컨텐츠의 질문 이미지 주소를 입력해주세요.
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="text-input">질문 내용</Label>
                </Col>
                <Col xs="12" md="10">
                  <Input
                    type="textarea"
                    id="content-question-content-input"
                    name="questionContent"
                    onChange={inputChangeHandler}
                    value={content.questionContent}
                     />
                  <FormText color="muted">
                    새 컨텐츠의 질문의 내용을 입력해주세요.
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="text-input">팝업 이미지 주소</Label>
                </Col>
                <Col xs="12" md="10">
                  <Input
                    type="text"
                    id="content-pop-up-image-uri-input"
                    name="popUpImageURI"
                    onChange={inputChangeHandler}
                    value={content.popUpImageURI}
                     />
                  <FormText color="muted">
                    새 컨텐츠의 팝업 이미지 주소를 입력해주세요.
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="2">
                  <Label htmlFor="text-input">팝업 메세지</Label>
                </Col>
                <Col xs="12" md="10">
                  <Input
                    type="text"
                    id="content-pop-up-message-input"
                    name="popUpMessage"
                    onChange={inputChangeHandler}
                    value={content.popUpMessage}
                     />
                  <FormText color="muted">
                    새 컨텐츠의 팝업 메세지를 입력해주세요.
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
                <Button id="filter" type="reset" size="sm" color="danger" onClick={() => setContent({...initContent})}>
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
          <ContentsTable />
        </Col>
      </Row>
    </div>
  );
}

export default Contents;
