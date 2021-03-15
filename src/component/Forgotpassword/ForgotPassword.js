import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
export default class ForgotPassword extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="login-bg">
          <div className="col-md-3 mx-auto">
            <div className="login-color">
              <h1 className="mb-4">Welcome</h1>
              <Form.Group className="mb-4 login-icon">
                <Form.Control type="email" placeholder="Email" />
                <span className="flaticon-envelope"></span>
              </Form.Group>
              <Form.Group className="mb-4 login-icon">
                <p>Enter the email address associated with your account.</p>
              </Form.Group>

              <Link to="/submit-otp" className="btn btn-submit mb-4">
                SEND OTP
              </Link>
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
