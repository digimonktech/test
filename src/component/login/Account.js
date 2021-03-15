import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
    };
  }

  onClickUser = () => {
    this.setState({
      text: "User",
    });
  };
  onClickEscort = () => {
    this.setState({
      text: "Escort",
    });
  };

  onClickAgency = () => {
    this.setState({
      text: "Agency",
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <Header />
        <div className="login-bg account">
          <div className="col-md-5 mx-auto">
            <div className="signup-tabs mb-3">
              <p>How do you want to REGISTER?</p>
              <ul>
                <li>
                  <input
                    type="radio"
                    defaultChecked
                    id="user"
                    name="selector"
                  />
                  <label htmlFor="user" onClick={this.onClickUser}>
                    User
                  </label>
                  <div className="check"></div>
                </li>
                <li>
                  <input type="radio" id="escort" name="selector" />
                  <label htmlFor="escort" onClick={this.onClickEscort}>
                    Escort
                  </label>
                  <div className="check"></div>
                </li>

                <li>
                  <input type="radio" id="agency" name="selector" />
                  <label htmlFor="agency" onClick={this.onClickAgency}>
                    Agency
                  </label>
                  <div className="check"></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 mx-auto">
            <div className="login-color">
              <h1>
                Welcome!
                <span>{this.state.text}</span>
              </h1>
              <Form.Group className=" login-icon">
                <Form.Control type="text" placeholder="Name" />
                <span className="flaticon-user"></span>
              </Form.Group>
              <Form.Group className="login-icon">
                <Form.Control type="email" placeholder="Email" />
                <span className="flaticon-envelope"></span>
              </Form.Group>
              <Form.Group className="login-icon">
                <Form.Control type="text" placeholder="Phone Number" />
                <span className="flaticon-phone"></span>
              </Form.Group>
              <Form.Group className="login-icon">
                <Form.Control type="password" placeholder="Password" />
                <span className="flaticon-password"></span>
              </Form.Group>
              <Form.Group className="login-icon">
                <Form.Control type="password" placeholder="Confirm Password" />
                <span className="flaticon-password"></span>
              </Form.Group>
              <Form.Group className="text-center account">
                Already have an account?
                <Link to="/login">Login Now</Link>
              </Form.Group>
              <Button variant="false" className="btn-submit " type="submit">
                CONTINUE
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
