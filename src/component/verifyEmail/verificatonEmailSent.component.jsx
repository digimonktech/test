import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import jwt_decode from "jwt-decode";
import { getData } from "../FetchNodeServices";

class VerificationEmailSent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
      currentEmail: "",
      userId: "",
      startTime: 15,
      currentlyAt: 15,
      startTimer: false,
    };
  }

  componentDidMount = async () => {
    const email = window.location.pathname.split("/")[2];
    const isValid = this.validateEmail(email);
    if (!isValid || !localStorage.getItem("TOKEN")) {
      this.props.history.push("/page-not-found");
    } else {
      this.setState({ currentEmail: email });
      const decode = jwt_decode(localStorage.getItem("TOKEN"));
      console.log(decode);
      if (decode.isEmailVerified) {
        this.props.history.push("/login");
      } else {
        this.setState({ userId: decode._id });
      }
    }
  };
  validateEmail = (mail) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  };

  resendEmail = async () => {
    console.log("userId: ", this.state.userId);
    this.onTimerStart();
    const result = await getData("auth/send-email-verification-token");
    console.log(result);
  };

  onTimerStart = () => {
    this.setState({ startTimer: true });
    this.interval = setInterval(() => {
      if (this.state.currentlyAt > 0) {
        this.setState((prevState) => ({
          currentlyAt: prevState.currentlyAt - 1,
        }));
      } else {
        clearInterval(this.interval);
        this.setState({ startTimer: false });
      }
    }, 1000);
    this.setState({
      startTime: this.state.startTime + 10,
      currentlyAt: this.state.startTime + 10,
    });
  };

  render() {
    return (
      <>
        <Header />
        <div
          className="login-bg user-dashboard"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "15vw",
            color: "white",
          }}
        >
          Verification Email has been sent to your email address:
          <b style={{ fontSize: "2vw" }}>{this.state.currentEmail}</b>
          <br />
          {!this.state.startTimer ? (
            <>
              If you haven't recieve Verificaiton Email yet,
              <span
                onClick={this.resendEmail}
                style={{ cursor: "pointer", color: "#ADD8E6" }}
              >
                CLICK HERE
              </span>
              to resend it.
            </>
          ) : (
            <>Email is send, try again in {this.state.currentlyAt} seconds</>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default VerificationEmailSent;
