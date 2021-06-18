import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { postData, getData } from "../FetchNodeServices";
import kookyLogo from "../../images/logo.png";
import PhoneInput, {
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import "react-phone-number-input/style.css";
import "../../assets/styles/phoneNumberInput/phoneNumber.styles.css";

export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      getemail: "",
      getPassword: "",
      getConfirmPassword: "",
      getname: "",
      getphonenumber: "",
      getMsg: "",
      getAgency: "",
      text: "",
      getUsername: "",
      button: "Continue",
      lstyle: { display: "none" },
      isOpen: false,

      allAgency: [],

      errors: {},
    };
  }
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("TOKEN")) {
      const decode = jwt_decode(localStorage.getItem("TOKEN"));
      switch (decode.role) {
        case "escort":
          this.props.history.push(`/user/escort/dashboard/${decode._id}`);
          break;
        case "user":
          this.props.history.push(`/user/dashboard/${decode._id}`);
          break;
        case "agency":
          this.props.history.push(`/user/agency/dashboard/${decode._id}`);
          break;
        default:
          break;
      }
    }
    const agency = await getData("agency/get-all-agencies");
    if (!agency.response) {
      console.log(agency);
      let newArr = agency.data.data.map((agency) => agency._id);
      this.setState({
        allAgency: agency.data.data,
      });
    } else {
      console.log("err", agency.response);
    }
  };

  handleLogin = async (props) => {
    console.log("pahuch gaye")
    var body = { email:this.state.getemail, password: this.state.getpassword };
    let url = "auth/login";
    var result = await postData(url, body);
    console.log("Atuh chec: ", result, result.response)
    if (result) {
      localStorage.setItem("TOKEN", result.token)
        const decode = jwt_decode(result.token);
        switch (decode.role) {
          case "escort":
            this.props.history.push(`/user/escort/dashboard/${decode._id}`);
            break;
          case "user":
            this.props.history.push(`/user/dashboard/${decode._id}`);
            break;
          case "agency":
            this.props.history.push(`/user/agency/dashboard/${decode._id}`);
            break;
          default:
            break;
        }
    
    } else {
      console.log("err: ", result.response);
}
  }
  

  handleSignup = async (props) => {
    this.setState({
      lstyle: { display: "block", marginLeft: 190 },
      button: "",
    });
    const {
      getemail,
      getpassword,
      getphonenumber,
      getname,
      text,
      getConfirmPassword,
      getUsername,
      getAgency,
    } = this.state;
    if (!text) {
      this.setState({
        errors: { role: "Role is required" },
        lstyle: { display: "none" },
        button: "Continue",
      });
      return;
    }
    if (
      !(getphonenumber && isValidPhoneNumber(getphonenumber) ? true : false)
    ) {
      this.setState({
        errors: {
          ...this.state.errors,
          contactNumber: "Invalid Contact Number",
        },
        lstyle: { display: "none" },
        button: "Continue",
      });
      return;
    }
    let international =
      getphonenumber && formatPhoneNumberIntl(getphonenumber).split(" ");
    const countryCode = international[0];
    let phoneNumber = "";
    for (let i = 1; i < international.length; i++) {
      phoneNumber += international[i] + " ";
    }
    phoneNumber = phoneNumber.trim();
    console.log(countryCode, phoneNumber);
    let body = {
      email: getemail,
      password: getpassword,
      name: getname,
      confirmPassword: getConfirmPassword,
      contactNumber: phoneNumber,
      countryCode: countryCode,
      username: getUsername,
      agencyId: getAgency,
    };
    console.log("body: ", body);
    let url = "";
    if (text === "user") {
      url = "user/sign-up";
    } else if (text === "escort") {
      url = "escort/sign-up-escort";
    } else {
      url = "agency/sign-up-agency";
    }
    let result = await postData(url, body);
    setTimeout(
      function () {
        if (result.response ? result.response.data.status === "fail" : false) {
          console.log("err: ", result.response)
          this.setState({
            errors: result.response.data.errors
              ? result.response.data.errors
              : {},
            // getMsg: result.message,
            lstyle: { display: "none" },
            button: "Continue",
          });
        } else if (result.status === "success") {
          this.setState({
            getMsg: result.message,
            isOpen: true,
            lstyle: { display: "none" },
            button: "Continue",
          });
          
          console.log("sent");
          // this.props.history.push("/login");
        }
        if (result) {
          console.log("Signup:", result.data);
         
 

          // this.props.history.push("/login");
          // if (body.role == "User") {
          //   this.props.history.push("/user/dashboard");
          //   localStorage.setItem("TOKEN", JSON.stringify(data));
          // } else if (body.role == "Escort") {
          //   this.props.history.push("/user/escort/dashboard");
          //    localStorage.setItem("TOKEN", JSON.stringify(data));
          // } else {
          //   this.props.history.push("/user/agency/dashboard");
          //    localStorage.setItem("TOKEN", JSON.stringify(data));
          // }
        } else {
          this.setState({
            getMsg: "Mail is exist plese try with another email id",
            lstyle: { display: "none" },
            button: "Continue",
          });
        }
      }.bind(this),
      3000
    );
  };

  
  handleClose = () => {
    this.setState({ isOpen: false });
    this.handleLogin();
  };

  onClickUser = () => {
    this.setState({
      text: "user",
    });
  };
  onClickEscort = () => {
    this.setState({
      text: "escort",
    });
  };

  onClickAgency = () => {
    this.setState({
      text: "agency",
    });
  };

  render() {
    const { getMsg } = this.state;
    return (
      <>
        <Header />
        <div className="login-bg account">
          <div className="col-md-5 mx-auto">
            <div className="signup-tabs mb-3">
              <p>How do you want to REGISTER?</p>
              <ul>
                <li>
                  <input type="radio" id="user" name="selector"  />
                  <label htmlFor="user" onClick={this.onClickUser}>
                    User
                    <br/>
                   <p style={{fontSize:12}}>[ Service Seeker ]
                  
                              </p>
                  </label>
                  <div className="check"></div>
                </li>
                <li>
                  <input type="radio" id="escort" name="selector" />
                  <label htmlFor="escort" onClick={this.onClickEscort}>
                    Escort
                    <br/>
                   <p style={{fontSize:12}}>[ Service provider  ]
                              </p>
                  </label>
                  <div className="check"></div>
                </li>

                <li>
                  <input type="radio" id="agency" name="selector" />
                  <label htmlFor="agency" onClick={this.onClickAgency}>
                    Agency
                    <br/>
                   <p style={{fontSize:12}}>[ Service provider  ]
                              </p>
                  </label>
                  <div className="check"></div>
                </li>
              </ul>
            </div>
            <label
              style={{
                display: this.state.errors.role ? "block" : "none",
                color: "red",
              }}
            >
              {this.state.errors.role}
            </label>
          </div>
          <div className="col-md-4 mx-auto">
            <div className="login-color">
              <h1>
                Welcome!
                <span>{this.state.text}</span>
              </h1>
              <Form.Group className="login-icon">
                <Form.Control
                  type="text"
                  placeholder={
                    this.state.text === "agency" ? "Agency Name" : "Name"
                  }
                  value={this.state.getname}
                  onChange={(e) => this.setState({ getname: e.target.value })}
                  style={{
                    backgroundColor: this.state.getname
                      ? "white"
                      : "transparent",
                  }}
                />
                <span className="flaticon-user"></span>
                <label
                  style={{
                    display: this.state.errors.name ? "block" : "none",
                    color: "red",
                  }}
                >
                  {this.state.errors.name}
                </label>
              </Form.Group>
              <Form.Group className="login-icon">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  onChange={(e) =>
                    this.setState({ getUsername: e.target.value })
                  }
                  style={{
                    backgroundColor: this.state.getUsername
                      ? "white"
                      : "transparent",
                  }}
                />
                <span className="flaticon-user"></span>
                <label
                  style={{
                    display: this.state.errors.username ? "block" : "none",
                    color: "red",
                  }}
                >
                  {this.state.errors.username}
                </label>
              </Form.Group>
              <Form.Group className="login-icon">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={(e) => this.setState({ getemail: e.target.value })}
                  style={{
                    backgroundColor: this.state.getemail
                      ? "white"
                      : "transparent",
                  }}
                />
                <span className="flaticon-envelope"></span>
                <label
                  style={{
                    display: this.state.errors.email ? "block" : "none",
                    color: "red",
                  }}
                >
                  {this.state.errors.email}
                </label>
              </Form.Group>

             
              <Form.Group className="login-icon">
                {/* <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  onChange={(e) =>
                    this.setState({ getphonenumber: e.target.value })
                  }
                  value={this.state.getphonenumber}
                  style={{
                    backgroundColor: this.state.getphonenumber
                      ? "white"
                      : "transparent",
                  }}
                /> */}
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="TH"
                  value={this.state.getphonenumber}
                  onChange={(e) => this.setState({ getphonenumber: e })}
                  className="form-control"
                  style={{
                    backgroundColor: this.state.getphonenumber
                      ? "white"
                      : "transparent",
                  }}
                />
                <span className="flaticon-phone"></span>
                <label
                  style={{
                    display: this.state.errors.contactNumber ? "block" : "none",
                    color: "red",
                  }}
                >
                  {this.state.errors.contactNumber}
                </label>
              </Form.Group>
              {this.state.text === "escort" ? (
                <Form.Group className="login-icon">
                  <Form.Control
                    as="select"
                    onChange={(e) =>
                      this.setState({ getAgency: e.target.value })
                    }
                    style={{
                      backgroundColor: this.state.getAgency
                        ? "white"
                        : "transparent",
                    }}
                  >
                    <option>Independent</option>
                    {this.state.allAgency.map((agency, idx) => (
                      <option value={agency._id}>{agency.name}</option>
                    ))}
                  </Form.Control>
                  {/* <span className="flaticon-password"></span> */}
                </Form.Group>
              ) : (
                ""
              )}
              <Form.Group className="login-icon">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    this.setState({ getpassword: e.target.value })
                  }
                  style={{
                    backgroundColor: this.state.getpassword
                      ? "white"
                      : "transparent",
                  }}
                />
                <span className="flaticon-password"></span>
              </Form.Group>
              <Form.Group className="login-icon">
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) =>
                    this.setState({ getConfirmPassword: e.target.value })
                  }
                  style={{
                    backgroundColor: this.state.getConfirmPassword
                      ? "white"
                      : "transparent",
                  }}
                />
                <span className="flaticon-password"></span>
                <label
                  style={{
                    display: this.state.errors.password ? "block" : "none",
                    color: "red",
                  }}
                >
                  {this.state.errors.password}
                </label>
              </Form.Group>
              <Form.Group className="text-center account">
                Already have an account?
                <Link to="/login">Login Now</Link>
              </Form.Group>
              <Button
                variant="false"
                className="btn-submit "
                type="submit"
                onClick={() => this.handleSignup()}
              >
                {this.state.button}{" "}
                <CircularProgress style={this.state.lstyle} color="white" />
              </Button>
              <h3>
                <center>
                  <font color="#e100ff" size="3">
                    {getMsg}
                  </font>
                </center>
              </h3>
            </div>
          </div>
        </div>
        <Dialog
          open={this.state.isOpen}
          keepMounted
          maxWidth="md"
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle
            id="alert-dialog-slide-title"
            style={{ textAlign: "center" }}
          >
            <img src={kookyLogo} alt="" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Verification link is sent to you email address:{" "}
              {this.state.getemail}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
        <Footer />
      </>
    );
  }
}
