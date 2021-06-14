import React, { Component } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

import Logo from "../images/logo.png";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      role: "",
      id: "",
    };
  }

  componentDidMount() {
    if (localStorage.getItem("TOKEN")) {
      const decode = jwt_decode(localStorage.getItem("TOKEN"));
      this.setState({ isSignedIn: true, role: decode.role, id: decode._id });
    } else {
      this.setState({ isSignedIn: false });
    }
  }

  handleLogOut = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  handleMyProfile = () => {
    switch (this.state.role) {
      case "escort":
        window.location.replace(`/user/escort/dashboard/${this.state.id}`);
        break;
      case "user":
        window.location.replace(`/user/dashboard/${this.state.id}`);
        break;
      case "agency":
        window.location.replace(`/user/agency/dashboard/${this.state.id}`);
        break;
      default:
        break;
    }
  };

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
                <Nav.Link href="/booking">Find an Escort</Nav.Link>
                {/* <Nav.Link href="/login" className="login">
                  {localStorage.getItem("getname")}
                </Nav.Link> */}
                <Dropdown>
                {this.state.isSignedIn ? (
                  <Dropdown.Toggle
                    as="a"
                    variant="false"
                    className="login"
                    id="dropdown-basic"
                  >
                    Dashboard
                    {localStorage.getItem("getname")}
                  </Dropdown.Toggle>
                ):
                <Dropdown.Toggle
                    as="a"
                    variant="false"
                    className="login"
                    id="dropdown-basic"
                  >
                    Login
                    {localStorage.getItem("getname")}
                  </Dropdown.Toggle>
                }
                  <Dropdown.Menu>
                    {this.state.isSignedIn ? (
                      <>
                        <Dropdown.Item onClick={this.handleMyProfile}>
                          My Profile
                        </Dropdown.Item>
                        <Dropdown.Item onClick={this.handleLogOut}>
                          Log out
                        </Dropdown.Item>
                      </>
                    ) : (
                      <>
                        <Dropdown.Item>
                          <Link to="/login">Login</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link to="/sign-up">Register</Link>
                        </Dropdown.Item>
                      </>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
