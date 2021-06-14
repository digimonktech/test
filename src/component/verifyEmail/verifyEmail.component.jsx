import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

import { getData } from "../FetchNodeServices";

class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVerified: false,
    };
  }

  componentDidMount = async () => {
    console.log("id: ", window.location.pathname.split("/")[2]);
    const token = window.location.pathname.split("/")[2];
    const result = await getData(`auth/verify-email-via-token/${token}`);
    if (!result.response) {
      this.setState({ isVerified: true });
    } else {
      this.setState({ isVerified: false });
    }
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
          {this.state.isVerified ? (
            <>
              <h1>Your Email is Verified you can login now.</h1>
              <p>
                <Link to="/login">Click here</Link> to login
              </p>
            </>
          ) : (
            <>
              <h1>Verification link is broken or expired.</h1>
            </>
          )}
        </div>
        <Footer />
      </>
    );
  }
}

export default VerifyEmail;
