import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { postData, getData } from "../../FetchNodeServices";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import kookyLogo from "../../../images/logo.png";

import PhoneInput, {
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  parsePhoneNumber,
} from "react-phone-number-input";

import "react-phone-number-input/style.css";
import "../../../assets/styles/phoneNumberInput/phoneNumber.styles.css";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getemail: "",
      getname: "",
      getcontactnumber: "",
      getAddress: "",
      getAboutInfo: "",
      open: false,
      result: "Profile Update Successfully",
      button: "Update",
      lstyle: { display: "none" },
      user: {},
      errors: {},
    };
  }

  handleSubmit = async () => {
    this.setState({
      lstyle: { display: "block" },
      button: "",
      errors: {},
    });
    const { getemail, getcontactnumber, getAddress, getAboutInfo } = this.state;
    if (!getcontactnumber) {
      this.setState({
        errors: { contactNumber: "Contact Number is required" },
        lstyle: { display: "none" },
        button: "Update",
      });
      return;
    }
    const phoneNumber = parsePhoneNumber(getcontactnumber);
    if (!phoneNumber) {
      this.setState({
        errors: { contactNumber: "Contact Number is required" },
        lstyle: { display: "none" },
        button: "Update",
      });
      return;
    }
    console.log("parsed: ", phoneNumber, getcontactnumber);
    var body = {
      email: getemail,
      name: this.state.getname,
      contactNumber: phoneNumber.nationalNumber,
      countryCode: "+" + phoneNumber.countryCallingCode,
      address: getAddress,
      about: getAboutInfo,
      id: this.props.userId,
    };
    console.log("body: ", body);
    var result = await postData("user/edit-user-profile", body);
    console.log(result);
    setTimeout(
      function () {
        if (!result.response) {
          console.log("succesfully submit:", result);
          this.props.handleUpdateProfile();
          // alert("success");
          this.setState({
            open: true,
            lstyle: { display: "none" },
            button: "Update",
          });
        } else {
          console.log("not succesfully submit", result.response);
          // alert("Failed");
          this.setState({
            lstyle: { display: "none" },
            button: "Update",
            errors: result.response.data.errors,
          });
        }
      }.bind(this),
      3000
    );
  };

  componentDidMount = async () => {
    let result = await getData(`user/get-user-details/${this.props.userId}`);
    if (result.data.data !== null) {
      this.setState({ user: result.data.data });
      this.setState({
        getemail: result.data.data.email,
        getname: result.data.data.name,
        getcontactnumber:
          result.data.data.countryCode +
          result.data.data.contactNumber.toString(),
        getAddress: result.data.data.address,
        getAboutInfo: result.data.data.about,
      });
    }
  };

  handleClose = async () => {
    this.setState({
      open: false,
      lstyle: { display: "none" },
      button: "Update",
    });
  };

  render() {
    // const Transition = React.forwardRef(function Transition(props, ref) {
    //   return <Slide direction="up" ref={ref} {...props} />;
    // });
    return (
      <>
        {/* {abc !== "" ? "" : ""} */}
        {/* <Dashboard data="jsdchsbhb" /> */}
        <div className="edit-profilebox">
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={this.state.getname}
              onChange={(e) => this.setState({ getname: e.target.value })}
            />
            <label
              style={{
                display: this.state.errors.name ? "block" : "none",
                color: "red",
              }}
            >
              {this.state.errors.name}
            </label>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="xyz@xyz.com"
              value={this.state.getemail}
              onChange={(e) => this.setState({ getemail: e.target.value })}
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <PhoneInput
              international
              defaultCountry="TH"
              countryCallingCodeEditable={false}
              value={this.state.getcontactnumber}
              limitMaxLength={true}
              onChange={(e) => {
                this.setState({ getcontactnumber: e });
              }}
              className="form-control phoneNumber"
              style={{
                backgroundColor: this.state.getcontactnumber
                  ? "white"
                  : "transparent",
              }}
            />
            <label
              style={{
                display: this.state.errors.contactNumber ? "block" : "none",
                color: "red",
              }}
            >
              {this.state.errors.contactNumber}
            </label>
          </Form.Group>
          {/* <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter you Address"
              value={this.state.getAddress}
              onChange={(e) => this.setState({ getAddress: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>About Info</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Kook about yourself"
              value={this.state.getAboutInfo}
              onChange={(e) => this.setState({ getAboutInfo: e.target.value })}
            />
          </Form.Group> */}
<Snackbar open={this.state.open} style={{position: 'relative',width:350,marginTop:30}} onClose={()=>this.handleClose()}>
        <MuiAlert onClose={()=>this.handleClose()} severity="success">
          Profile Updated Successfully
        </MuiAlert>
      
      </Snackbar>
          <Form.Group className="text-right">
            <Button
              type="submit"
              className="uppercase  "
              onClick={() => this.handleSubmit(this.props.data)}
            >
              {this.state.button}{" "}
              <CircularProgress style={this.state.lstyle} color="white" />
            </Button>
          </Form.Group>
         </div>
      </>
    );
  }
}
