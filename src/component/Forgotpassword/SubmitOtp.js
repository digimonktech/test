import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Form, Button } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";

import OtpInput from "react-otp-input";
import {
  ServerURL,
  getData,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";
export default class SubmitOtp extends Component {
  constructor() {
    super();
    this.state = {
      otp: "",
      numInputs: 4,
      button: "Submit ",
      lstyle: { display: "none" },
      isDisabled: false,
      wrongOtp:"",
    };
  }
  componentDidMount = () => {
    console.log("this.props new", this.props.match.params.email);

  };

  handleChange = (otp) => this.setState({ otp });
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ button: "",
    lstyle: { display: "block" ,marginLeft:75}});
    // var body = { otp: this.state.otp, email: this.props.location.email };
    // console.log({ body });
    var result = await getData(`auth/verify-password-pin/${this.state.otp}`);
    console.log(result);
    setTimeout(() => {

    if (!result.response) {
      console.log(result);
     console.log( result.data.resetPasswordToken)
     this.setState({ button: "Submit ",
    lstyle: { display: "none" },});
      this.props.history.push(`/reset-password/${result.data.resetPasswordToken}`);
    } else {
      console.log(result.response);
      this.setState({ button: "Submit ",
      lstyle: { display: "none" },
    wrongOtp:"Enter wrong verification code"
    });
    }
  },2000);
  };

  render() {
    const { otp, numInputs, isDisabled } = this.state;
    return (
      <>
        <Header />
        <div className="login-bg">
          <div className="col-md-5 mx-auto">
            <div className="login-color">
              <h1 className="mb-4">Forget Password</h1>
              <p>This verification code is send on { this.props.match.params.email } </p>
              <p>Enter the verification code here</p>
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
                <div style={{textAlign: 'center'}}>
                <label
                style={{
                  display: this.state.wrongOtp ? "block" : "none",
                  color: "red",
                }}
              >
                {" "}
                {this.state.wrongOtp}
              </label>
              </div>
              <div className="col-md-5 mx-auto">
                <Form.Group className="mt-4 text-center ">
                  <Button
                    type="submit"
                    className="btn btn-submit mt-4"
                    variant="false"
                    disabled={otp.length < numInputs}
                  >
                     {this.state.button}{" "}
                <CircularProgress style={this.state.lstyle} color="white" />
                  </Button>
                </Form.Group>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
