import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from "@material-ui/core/Slide";
import jwt_decode from "jwt-decode";

import { patchData } from "../FetchNodeServices";
export default class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      otp: "",
      numInputs: 4,
      password: "",
      confirmPassword: "",
      isDisabled: false,
      newPassword: "",
      newcPassword: "",
      open: false,
      button: "Submit",
      lstyle: { display: "none" },
      result: "Password Update Successfully",
    };
  }
  componentDidMount = () => {};

  handlePasswordUpdate = async(e) => {
    e.preventDefault();

    this.setState({
      lstyle: { display: "block", marginLeft: 135 },
      button: "",
    });
    
    if (
      this.state.password === this.state.confirmPassword &&
      this.state.password.length > 5 &&
      this.state.confirmPassword.length > 5
    ){

      const body = {
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      };
      console.log(body);
      const result = await patchData(
        `auth/reset-password/${this.props.match.params.token}`,
        body
      );
      console.log('reset result',result);

        if (!result.response) {
          console.log(result);
          this.setState({ open: true ,    lstyle: { display: "none" },
          button: "Submit", newPassword:"",newcPassword:""});
          // localStorage.setItem("TOKEN", result.token)
          const decode = jwt_decode(result.token);
          console.log("check role",decode.role);

          // switch (decode.role) {
          //   case "escort":
          //     this.props.history.push(`/user/escort/dashboard/${decode._id}`);
          //     break;
          //   case "user":
          //     this.props.history.push(`/user/dashboard/${decode._id}`);
          //     break;
          //   case "agency":
          //     this.props.history.push(`/user/agency/dashboard/${decode._id}`);
          //     break;
          //   default:
          //     break;
          // }

        } else {
          this.setState({
            newcPassword:
              "Something Went wrong",
            lstyle: { display: "none" },
            button: "Submit",
          });
        }

  
} else {
  this.setState({
    newcPassword:
      "Password or Confirm password must be same and must be 6",
    lstyle: { display: "none" },
    button: "Submit",
  });
}
  };
  handleClose = async () => {
    this.setState({
      open: false,
      lstyle: { display: "none" },
      button: "Submit",
    });
  };

  render() {
    return (
      <>
        <Header />
      
        <div className="login-bg">
          <div className="col-md-4 mx-auto">
            <div className="login-color">
              <h1 className="mb-3">Reset Password</h1>
               <Snackbar open={this.state.open} style={{position: 'relative',width:350,marginTop:10}} onClose={()=>this.handleClose()}>
        <MuiAlert onClose={()=>this.handleClose()} severity="success">
          Password Updated Successfully
        </MuiAlert>
      
      </Snackbar>
              <div className="col-md-9 mx-auto">
              <Form.Group className="mb-4 login-icon">
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <span className="flaticon-password"></span>
              </Form.Group>
              <label
                style={{
                  display: this.state.newPassword ? "block" : "none",
                  color: "red",
                }}
              >
                {" "}
                {this.state.newPassword}
              </label>
              <Form.Group className="mb-4 login-icon">
                <Form.Control
                  type="password"
                  placeholder="Confirm New Password"
                  onChange={(e) =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                />
                <span className="flaticon-password"></span>
              </Form.Group>
              <label
                style={{
                  display: this.state.newcPassword ? "block" : "none",
                  color: "red",
                }}
              >
                {this.state.newcPassword}
              </label>
              <Link
                to={{
                  // pathname: "/login",
                }}
                className="btn btn-submit mb-4"
                onClick={(e) => this.handlePasswordUpdate(e)}
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
