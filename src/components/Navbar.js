import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <LinkContainer to="/home">
            <Navbar.Brand>iNote</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>

          {!localStorage.getItem("token") ? (
            <div>
              {" "}
              <LinkContainer to="/login">
                <Button className="mx-2" variant="primary">
                  {" "}
                  Login{" "}
                </Button>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Button className="mx-2" variant="outline-primary">
                  {" "}
                  Signup{" "}
                </Button>
              </LinkContainer>{" "}
            </div>
          ) : (
            <div>
              <Button variant="primary" onClick={handleLogout}>
                Logout
              </Button>{" "}
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
