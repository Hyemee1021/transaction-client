import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SignupForm } from "../components/SignupForm";
import { FooterSection } from "../components/FooterSection";
import { TopNav } from "../components/TopNav";
const SignupPage = () => {
  return (
    <>
      <TopNav />
      <Container fluid>
        <Row className="d-flex justify-content-center   align-items-center w-100 ">
          {/* <Col className="bg-info text-light vh-100 d-flex justify-content-center align-items-center "></Col> */}
          <Col className="d-flex flex-column justify-content-center   align-items-center ">
            <div className=" w-75 text-center rounded p-3">
              <h1>Join Our Community!</h1>
              <p>Laverage our ststem to track your finance</p>
            </div>
            <div className="w-75 shadow-lg px-5 py-3 border rounded">
              <h2>Signup Now</h2>
              <hr />
              <SignupForm />
            </div>
          </Col>
        </Row>
        <Row>
          <FooterSection />
        </Row>
      </Container>
    </>
  );
};

export default SignupPage;
