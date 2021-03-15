import React, { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

import Logo from "../images/logo.png";
export default class Header extends Component {
  render() {
    return (
      <>
        <Navbar bg="black" expand="lg" fixed="top">
          <Container>
            <Navbar.Brand href="/">
              <img src={Logo} alt="" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto header-menu aligin-items-center">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#link">Find an Escort</Nav.Link>
                <Nav.Link href="/login" className="login">
                  Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
