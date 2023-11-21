import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";

export const TopNav = () => {
  const userJson = sessionStorage.getItem("user");
  console.log(userJson);
  const userObj = JSON.parse(userJson);

  const handleOnLogOut = () => {
    sessionStorage.removeItem("user");
  };
  return (
    <Navbar expand="md" className="bg-body-secondary">
      <Container fluid>
        <Navbar.Brand href="#home">TR</Navbar.Brand>
        {/* welcome msg */}
        {userObj?.name && <div>Welcome {userObj.name} </div>}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userObj?._id ? (
              <Link to="/" onClick={handleOnLogOut} className="nav-link">
                Log Out
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
