import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export const TopNav = () => {
  const userJson = sessionStorage.getItem("user");

  const userObj = JSON.parse(userJson);
  console.log(userObj);

  const handleOnLogOut = () => {
    sessionStorage.removeItem("user");
  };

  return (
    <Navbar expand="md" className="bg-warning">
      <Container fluid style={{ width: "90%" }}>
        <Navbar.Brand href="#home">Budgeting</Navbar.Brand>

        {userObj?.name && <h3>Welcome, {userObj?.name}</h3>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto text-end ">
            {userObj?._id ? (
              <Link to="/" onClick={handleOnLogOut} className="nav-link ">
                Log out
              </Link>
            ) : (
              <>
                <Link to="/" className="nav-link">
                  Sign In
                </Link>

                <Link to="/signup" className="nav-link">
                  Sign Up
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
