import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import jwt_decode from "jwt-decode";
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
    console.log(result.data);
    if (!result.response) {
      this.setState({ isVerified: true });
      if(localStorage.getItem("TOKEN")){
        const decode = jwt_decode(localStorage.getItem("TOKEN"));
      console.log('result',result)
      console.log("check role",decode.role,decode.id);

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
      else {
         
      localStorage.setItem("TOKEN", result.data.token)
      const decode = jwt_decode(result.token);
      console.log('result',result)
      console.log("check role",decode.role,decode.id);

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
