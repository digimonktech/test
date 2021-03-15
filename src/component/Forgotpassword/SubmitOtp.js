import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Form, Button } from "react-bootstrap";

import OtpInput from "react-otp-input";
export default class SubmitOtp extends Component {
constructor(){
    super();
    this.state = {
      otp: "",
      numInputs: 4,
   
      isDisabled: false,
   
     
    
     
    };
}

  handleChange = (otp) => this.setState({ otp });
  handleSubmit = (e) => {
    e.preventDefault();
    alert(this.state.otp);
  };

  render() {
    const { otp, numInputs, isDisabled } = this.state;
    return (
      <>
        <Header />
        <div className="login-bg">
          <div className="col-md-3 mx-auto">
            <div className="login-color">
              <h1 className="mb-4">Welcome</h1>
              <form onSubmit={this.handleSubmit}>
                <Form.Group>
                  <div className="opt-box">
                    <OtpInput
                      className="optbox"
                      value={this.state.otp}
                      onChange={this.handleChange}
                      numInputs={4}
                      separator={<span>-</span>}
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mt-4 text-center">
                  <Button
                    type="submit"
                    className="btn btn-submit mt-4" variant="false"
                    disabled={otp.length < numInputs}
                  >
                    Get OTP
                  </Button>
                </Form.Group>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
