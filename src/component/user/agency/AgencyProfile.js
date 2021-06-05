import React, { Component } from "react";

import { Row, Col, Form, Button } from "react-bootstrap";
import kookyLogo from "../../../images/logo.png";
import { postData } from "../../FetchNodeServices";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
export default class AgencyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      ownerName: "",
      country: "",
      city: "",
      percentageShare: 0,
      open: false,
      result: "Profile Update Successfully",
      button: "Update",
      lstyle: { display: "none" },
    };
  }
  componentDidMount() {
    const { agencyDetails } = this.props;
    this.setState({
      email: agencyDetails.email ? agencyDetails.email : "",
      ownerName: agencyDetails.ownerName ? agencyDetails.ownerName : "",
      country: agencyDetails.country ? agencyDetails.country : "",
      city: agencyDetails.city ? agencyDetails.city : "",
      percentageShare: agencyDetails.percentageShare
        ? agencyDetails.percentageShare
        : 0,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.agencyDetails !== this.props.agencyDetails) {
      const { agencyDetails } = this.props;
      this.setState({
        email: agencyDetails.email ? agencyDetails.email : "",
        ownerName: agencyDetails.ownerName ? agencyDetails.ownerName : "",
        country: agencyDetails.country ? agencyDetails.country : "",
        city: agencyDetails.city ? agencyDetails.city : "",
        percentageShare: agencyDetails.percentageShare
          ? agencyDetails.percentageShare
          : 0,
      });
    }
  }

  handleSave = async (e) => {
    this.setState({
      lstyle: { display: "block" },
      button: "",
    });
    e.preventDefault();
    const body = {
      id: this.props.agencyDetails._id,
      ownerName: this.state.ownerName,
      country: this.state.country,
      city: this.state.city,
      percentageShare: this.state.percentageShare,
    };
    const result = await postData("agency/update-agency-profile", body);
    setTimeout(() => {
      if (!result.response) {
        this.setState({
          open: true,
          lstyle: { display: "none" },
          button: "update",
        });
        this.props.handleUpdate();
      } else {
        console.log("err: ", result.response);
        this.setState({ lstyle: { display: "none" }, button: "update" });
      }
    }, 3000);
  };
  handleClose = async () => {
    this.setState({
      open: false,
      lstyle: { display: "none" },
      button: "update",
    });
  };
  render() {
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    return (
      <>
        <div className="edit-profilebox">
          <Dialog
            open={this.state.open}
            // TransitionComponent={Transition}
            keepMounted
            maxWidth="md"
            onClose={() => this.handleClose()}
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
              <DialogContentText
                id="alert-dialog-slide-description"
                style={{
                  position: "relative",
                  textAlign: "center",
                  minWidth: 620,
                  minHeight: 50,
                  marginTop: 20,
                }}
              >
                <h3>{this.state.result}</h3>
              </DialogContentText>
            </DialogContent>
            <DialogActions style={{ textItem: "center", postion: "relative" }}>
              <Button onClick={() => this.handleClose()} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>
          <Form>
            <Form.Group>
              <Form.Label>Agency Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter You Agency Name"
                value={
                  this.props.agencyDetails ? this.props.agencyDetails.name : ""
                }
                disabled
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter you Email here"
                disabled
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Owner name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Owner Name"
                value={this.state.ownerName}
                onChange={(e) => this.setState({ ownerName: e.target.value })}
              />
            </Form.Group>
            <Row xs={1} md={2} lg={2}>
              <Col>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.country}
                    onChange={(e) => this.setState({ country: e.target.value })}
                  >
                    <option>Select Country</option>
                    <option value="country1">Country 1</option>
                    <option value="country2">Country 2</option>
                    <option value="country3">Country 3</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.city}
                    onChange={(e) => this.setState({ city: e.target.value })}
                  >
                    <option>Select City</option>
                    <option value="city1">City 1</option>
                    <option value="city2">City 2</option>
                    <option value="city3">City 3</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Set percentage</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Share"
                maxLength={2}
                value={`${this.state.percentageShare}`}
                onChange={(e) => {
                  this.setState({
                    percentageShare: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="text-right">
              <Button
                type="submit"
                className="uppercase"
                onClick={this.handleSave}
              >
                {this.state.button}{" "}
                <CircularProgress style={this.state.lstyle} color="white" />
              </Button>
            </Form.Group>
            <Form.Group className="text-right" style={{ color: "green" }}>
              {this.state.msg}
            </Form.Group>
          </Form>
        </div>
      </>
    );
  }
}
