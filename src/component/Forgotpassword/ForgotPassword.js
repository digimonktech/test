import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  ServerURL,
  getData,
  postData,
  postDataAndImage,
} from "../FetchNodeServices";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
       getemailid: "" ,
  button: "Send Verification Code",
  lstyle: { display: "none"},
  };

  }

  handleOtp = async () => {
    this.setState({
      button: "",
  lstyle: { display: "block",marginLeft:160},
    })
    const { getemailid } = this.state;
    var body = { email: getemailid };
    console.log(body);
    var result = await postData("auth/forget-password", body);
    console.log(result.response);
    setTimeout(() => {
    if (!result.response) {
      console.log("otp:", result);
      this.setState({lstyle: { display: "none" },button:"Send Verification Code"})
      this.props.history.push(`/submit-otp/${body.email}`);
    } else {
      this.setState({ getMsg: "Invalid Email Address",lstyle: { display: "none" },button:"Send Verification Code" });
    }
  },2000);
  };
  render() {
    const { getemailid } = this.state;
    return (
      <>
        <Header />
        <div className="login-bg">
          <div className="col-md-6 mx-auto">
            <div className="login-color">
              <h1 className="mb-4"> Forget Password</h1>
              <div className="col-md-7 mx-auto">
              <Form.Group className="mb-4 login-icon">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={(e) =>
                    this.setState({ getemailid: e.target.value })
                  }
                />
                <span className="flaticon-envelope"></span>
              </Form.Group>
              <label
                style={{
                  display: this.state.getMsg ? "block" : "none",
                  color: "red",
                }}
              >
                {" "}
                {this.state.getMsg}
              </label>
              <Form.Group className="mb-4 login-icon">
                <p>Enter the email address associated with your account.</p>
              </Form.Group>
              <Link
                className="btn btn-submit mb-4"
                onClick={() => this.handleOtp()}
              >
                {this.state.button}{" "}
                <CircularProgress style={this.state.lstyle} color="white" />
              </Link>
              <Form.Group className="text-center account">
                Don't have an account <Link to="/Sign-up">Create Now</Link>
              </Form.Group>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
