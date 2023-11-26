import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import { LoginForm } from "../components/LoginForm";
import { FooterSection } from "../components/FooterSection";
const LoginPage = () => {
  return (
    <Container className="vh-100  " fluid={true}>
      <Row className="my-3">
        <Col
          className=" d-flex justify-content-center align-items-center
        "
        >
          <div className="text-center ">
            <h1>Welcome </h1>
            <p>Login to our system and take a control of your budgeting</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center align-items-center ">
          <div className=" bg-warning shadow-lg py-3 px-5 border rounded">
            <h2 className="text-center">Log on</h2>
            <hr />
            <LoginForm />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <FooterSection />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
