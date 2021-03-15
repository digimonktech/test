import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default class Login extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <>
        <Header />
        <div className="login-bg">
          <div className="col-md-3 mx-auto">
            <div className="login-color">
              <h1 className="mb-4">Welcome!</h1>
              <Form.Group className="mb-4 login-icon">
                <Form.Control type="email" placeholder="Email" />
                <span className="flaticon-envelope"></span>
              </Form.Group>
              <Form.Group className="mb-4 login-icon">
                <Form.Control type="password" placeholder="Password" />
                <span className="flaticon-password"></span>
              </Form.Group>
              <Form.Group className="text-right mb-4">
                <Link to="/forgot-password">Forgot password?</Link>
              </Form.Group>
              <Button variant="false" className="btn-submit mb-4" type="submit">
                Submit
              </Button>
              <Form.Group className="text-center account">
                Don't have an account <Link to="/Sign-up">Create Now</Link>
              </Form.Group>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
