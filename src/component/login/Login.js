import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { postData } from "../FetchNodeServices";
import CircularProgress from '@material-ui/core/CircularProgress';
export default class Login extends Component {
  //   componentDidMount() {
  //     window.scrollTo(0, 0);
  //   }
  constructor(props) {
    super(props);
    this.state = {
      getemailid: "",
      getpassword: "",
      getMsg: "",
      role: "",
      button:"Submit",
      lstyle:{display:'none'},
      errors: {},
    };
  }

  componentDidMount() {
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
  }

  handleLogin = async (props) => {
    this.setState({
      lstyle:{display:'block',marginLeft:130},
      button:"",
    });
    this.setState({ errors: {}, getMsg: "" });
    const { getemailid, getpassword } = this.state;
    var body = { email: getemailid, password: getpassword };
    let url = "auth/login";
    var result = await postData(url, body);
    console.log("Atuh chec: ", result, result.response)
    var data = result.data;
    console.log("updatedtoken", data);
    if (!result.response) {
      if (localStorage.getItem("TOKEN")) {
        localStorage.removeItem("TOKEN");
      }
      if (data.role === "escort") {
        localStorage.setItem("TOKEN", result.token);
        window.location.replace(`/user/escort/dashboard/${data._id}`);
      } else if (data.role === "user") {
        localStorage.setItem("TOKEN", result.token);
        this.props.history.push(`/user/dashboard/${data._id}`);
      } else if (data.role === "agency") {
        localStorage.setItem("TOKEN", result.token);
        this.props.history.push(`/user/agency/dashboard/${data._id}`);
      }
    } else {
      console.log("err: ", result.response);
      setTimeout(function() {  if (result.response.data.errors) {
        this.setState({ errors: result.response.data.errors ,   lstyle:{display:'none'},
        button:"Submit"  });
      } else {
        this.setState({ getMsg: "Invalid emailId/Password",   lstyle:{display:'none'},
        button:"Submit" });
      }}.bind(this), 3000)
    }
  };
  render() {
    const { getMsg } = this.state;
    return (
      <>
        <Header />
        <div className="login-bg">
          <div className="col-md-3 mx-auto">
            <div className="login-color">
              <h1 className="mb-4">Welcome!</h1>
              <Form.Group className="mb-4 login-icon">
                <Form.Control
                  type="email"
                  placeholder={
                    this.state.role === "agency" ? "Agency Email" : "Email"
                  }
                  onChange={(e) =>
                    this.setState({ getemailid: e.target.value })
                  }
                  style={{
                    backgroundColor: this.state.getemailid
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
              <Form.Group className="mb-4 login-icon">
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
                <label
                  style={{
                    display: this.state.errors.password ? "block" : "none",
                    color: "red",
                  }}
                >
                  {this.state.errors.password}
                </label>
              </Form.Group>
              <Form.Group className="text-right mb-4">
                <Link to="/forgot-password">Forgot password?</Link>
              </Form.Group>
              <Button
                variant="false"
                className="btn-submit mb-4"
                type="submit"
                onClick={() => this.handleLogin()}
                style={{textAlign:"center",itemAlign:"center"}}
              >
         {this. state.button} <CircularProgress style={this.state.lstyle} color="white" />
           </Button>
              <h3>
                <center>
                  <font color="#e100ff" size="3">
                    {getMsg}
                  </font>
                </center>
              </h3>
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
