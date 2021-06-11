import React, { Component } from "react";
import kookyLogo from "../../images/logo.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Viewmg from "../../images/searchuser.png";
import { postData } from "../FetchNodeServices";
import Header from "../Header";
import Footer from "../Footer";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";

export default class BookingEscort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotal: "",
      name: "",
      email: "",
      userDetails: {},
      roomNumber: "",
      specialRequest: "",
      address: "Don't know what to put...",
      errors: {},
      status: "",
      button: "CONFIRM BOOKING",
      lstyle: { display: "none" },
      isOpen: false,
      date: new Date().toISOString().split("T")[0],
      time: "",
    };
  }
  addDays = (date, days) => {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
  };
  componentDidMount() {
    const token = localStorage.getItem("TOKEN");
    console.log("props: ", this.props.location);
    if (!this.props.location.state) {
      this.props.history.push(`/viewEscort/${this.props.match.id}`);
      return;
    }
    if (this.props.location.state.details) {
      let date = this.props.location.state.details.date;
      if (date === "Tommorow") {
        this.setState({
          date: this.addDays(new Date(), 1).toISOString().split("T")[0],
        });
        console.log(this.addDays(new Date(), 1).toISOString().split("T")[0]);
      }
      let time = this.props.location.state.details.time;
      // console.log(
      //   time.split(":")[0],
      //   time.split(":")[1].split(" ")[0],
      //   time.split(":")[1].split(" ")[1]
      // );
      let amOrPm = time.split(":")[1].split(" ")[1];
      let hours =
        amOrPm === "pm"
          ? Number(time.split(":")[0]) + 12
          : Number(time.split(":")[0]);
      let minuit = Number(time.split(":")[1].split(" ")[0]);
      let time2 = new Date(2011, 0, 1, hours, minuit, 0, 0);
      console.log(time2);
      this.setState({ time: time2 });
      // let time = this.props.location.state.details.date.split(" ")[1];
      // if (time.split(":")[0].length < 2) {
      //   time = "0" + time;
      // }
      // this.setState({
      //   date: this.props.location.state.details.date.split(" ")[0],
      //   time: time,
      // });
    }
    if (!token) {
      // window.location.replace(`/sign-up`)
      // this.props.history.push(`/sign-up`);
      this.setState({ userDetails: {} });
    } else {
      const decode = jwt_decode(localStorage.getItem("TOKEN"));
      this.setState({ userDetails: decode });
    }
  }

  handleBooking = async () => {
    this.setState({
      lstyle: { display: "block" },
      button: "",
    });
    const { escort, details } = this.props.location.state;
    this.setState({ errors: {} });
    if (this.state.date === "") {
      this.setState({ errors: { ...this.state.errors, date: "Invalid Date" } });
    }

    if (Object.keys(this.state.userDetails).length) {
      const body = {
        customerID: this.state.userDetails._id,
        escortID: escort._id,
        agencyID: details.typePlan === "inCall" ? details.agencyId : null,
        specialRequest: this.state.specialRequest,
        date: this.state.date,
        time: this.state.time,
        duration: details.selectedPlan.hours,
        outCall: details.typePlan === "outCall",
        inCall: details.typePlan === "inCall",
        outCallPlan: details.typePlan === "outCall" ? details.selectedPlan : {},
        inCallPlan: details.typePlan === "inCall" ? details.selectedPlan : {},
        hotal: { name: this.state.hotal, roomNumber: this.state.roomNumber },
        address: this.state.address,
      };
      console.log("BOdy: ", body);
      const result = await postData("booking/book-escort-directly", body);
      if (result.response) {
        console.log(result.response.data);
        this.setState({
          errors: { ...this.state.errors, ...result.response.data.errors },
        });
      } else {
        this.setState({
          status: "success",
          errors: {},
          isOpen: true,
          lstyle: { display: "none" },
          button: "CONFIRM BOOKING",
        });
      }
    } else {
      const body = {
        customerName: this.state.name,
        customerEmail: this.state.email,
        escortID: escort._id,
        agencyID: details.typePlan === "inCall" ? details.agencyId : null,
        specialRequest: this.state.specialRequest,
        date: this.state.date,
        time: this.state.time,
        duration: details.selectedPlan.hours,
        outCall: details.typePlan === "outCall",
        inCall: details.typePlan === "inCall",
        outCallPlan: details.typePlan === "outCall" ? details.selectedPlan : {},
        inCallPlan: details.typePlan === "inCall" ? details.selectedPlan : {},
        hotal: { name: this.state.hotal, roomNumber: this.state.roomNumber },
        address: this.state.address,
      };
      console.log("ind: ", body);
      const result = await postData("booking/book-escort-without-login", body);
      if (result.response) {
        console.log(result.response.data);
        this.setState({
          errors: { ...result.response.data.errors, ...this.state.errors },
        });
      } else {
        this.setState({
          status: "success",
          errors: {},
          isOpen: true,
          lstyle: { display: "none" },
          button: "CONFIRM BOOKING",
        });
      }
    }
  };
  handleClose = () => {
    this.setState({ isOpen: false });
    this.props.history.push("/");
  };
  render() {
    if (!this.props.location.state) {
      // this.props.history.push(`/viewEscort/${this.props.match.id}`);
      return <></>;
    }
    const { escort, details } = this.props.location.state;
    return (
      <>
        <Header />
        <Container style={{ marginTop: "10vh" }}>
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
              <DialogContentText
                id="alert-dialog-slide-description"
                style={{
                  position: "relative",
                  minWidth: 620,
                  minHeight: 50,
                  marginTop: 20,
                }}
              >
                <h3> Your Booking Request is successfully sent to esscort</h3>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => this.handleClose()} color="primary">
                Done
              </Button>
            </DialogActions>
          </Dialog>
          <div className="viewbox pb-4">
            <Row>
              <Col md="12">
                <div className="view-title mb-4">
                  <h2>Booking Details</h2>
                </div>
              </Col>
              <Col md="12">
                <div className="booking-detailsbox mb-4">
                  <Row>
                    <Col md="4">
                      <img src={escort.profileImg || Viewmg} alt="" />
                    </Col>
                    <Col md="8">
                      <div className="timebox bookingslot">
                        <h3>
                          {escort.name} ({escort.gender})
                        </h3>
                        <ul>
                          <li>
                            <i className="flaticon-clock"></i> {this.state.date}
                          </li>
                          <li>
                            <i className="flaticon-alarm-clock"></i>{" "}
                            {details.selectedPlan.hours} hr
                          </li>
                          <li>
                            <i className="flaticon-building"></i>{" "}
                            {details.typePlan === "outCall"
                              ? this.state.hotal
                              : this.state.address}
                          </li>
                          <li>
                            <i className="flaticon-credit-card"></i> $
                            {details.selectedPlan.rate}
                          </li>
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </div>

                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="type here"
                    disabled={this.state.userDetails.name ? true : false}
                    value={
                      this.state.userDetails.name
                        ? this.state.userDetails.name
                        : this.state.name
                    }
                    onChange={(e) => this.setState({ name: e.target.value })}
                  ></Form.Control>
                  <label
                    style={{
                      display: this.state.errors.customerName
                        ? "block"
                        : "none",
                      color: "red",
                    }}
                  >
                    {this.state.errors.customerName}
                  </label>
                </Form.Group>
                <Form style={{ display: "flex" }}>
                  <Form.Group style={{ width: "12vw", marginRight: "5vw" }}>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="type here"
                      value={this.state.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => this.setState({ date: e.target.value })}
                    ></Form.Control>
                    <label
                      style={{
                        display: this.state.errors.date ? "block" : "none",
                        color: "red",
                      }}
                    >
                      {this.state.errors.date}
                    </label>
                  </Form.Group>
                  <Form.Group style={{ width: "12vw" }}>
                    <Form.Label>Time</Form.Label>
                    <TimePickerComponent
                      style={{
                        borderLeft: 1,
                        borderBlock: "block",
                        borderBlockColor: "black",
                        border: "box",
                      }}
                      id="timepicker"
                      value={this.state.time}
                      onChange={(e) => {
                        console.log(e.target.value.toISOString());
                        this.setState({ time: e.target.value });
                      }}
                    />

                    {/* <Form.Control
                      type="time"
                      placeholder="type here"
                      value={this.state.time}
                      onChange={(e) => {
                        this.setState({ time: e.target.value });
                      }}
                    ></Form.Control> */}
                    <label
                      style={{
                        display: this.state.errors.time ? "block" : "none",
                        color: "red",
                      }}
                    >
                      {this.state.errors.time}
                    </label>
                  </Form.Group>
                </Form>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="type here"
                    disabled={this.state.userDetails.email ? true : false}
                    value={
                      this.state.userDetails.email
                        ? this.state.userDetails.email
                        : this.state.email
                    }
                    onChange={(e) => this.setState({ email: e.target.value })}
                  ></Form.Control>
                  <label
                    style={{
                      display: this.state.errors.customerEmail
                        ? "block"
                        : "none",
                      color: "red",
                    }}
                  >
                    {this.state.errors.customerEmail}
                  </label>
                </Form.Group>
                {details.typePlan === "outCall" ? (
                  <>
                    <Form.Group>
                      <Form.Label>Hotel Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Hotal Name"
                        value={this.state.hotal}
                        onChange={(e) =>
                          this.setState({ hotal: e.target.value })
                        }
                      ></Form.Control>
                      <label
                        style={{
                          display: this.state.errors.hotalName
                            ? "block"
                            : "none",
                          color: "red",
                        }}
                      >
                        {this.state.errors.hotalName}
                      </label>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Room Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Room Number"
                        value={this.state.roomNumber}
                        onChange={(e) =>
                          this.setState({ roomNumber: e.target.value })
                        }
                      ></Form.Control>
                      <label
                        style={{
                          display: this.state.errors.roomNumber
                            ? "block"
                            : "none",
                          color: "red",
                        }}
                      >
                        {this.state.errors.roomNumber}
                      </label>
                    </Form.Group>
                  </>
                ) : (
                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      value={this.state.address}
                      disabled
                    ></Form.Control>
                    <label
                      style={{
                        display: this.state.errors.address ? "block" : "none",
                        color: "red",
                      }}
                    >
                      {this.state.errors.address}
                    </label>
                  </Form.Group>
                )}
                <Form.Group>
                  <Form.Label>Special Request</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter Special Request"
                    value={this.state.specialRequest}
                    onChange={(e) =>
                      this.setState({ specialRequest: e.target.value })
                    }
                  ></Form.Control>
                  <label
                    style={{
                      display: this.state.errors.specialRequest
                        ? "block"
                        : "none",
                      color: "red",
                    }}
                  >
                    {this.state.errors.specialRequest}
                  </label>
                </Form.Group>

                <p className="confirm">
                  By confirming this booking you are agreeing to our{" "}
                  <Link to="/term-of-use">terms & conditions.</Link>
                </p>
                <Form.Group className="text-right">
                  <Button
                    className="btn btn-primary"
                    onClick={this.handleBooking}
                  >
                    {this.state.button}{" "}
                    <CircularProgress style={this.state.lstyle} color="white" />
                  </Button>
                  {/* <label
                    style={{
                      display: this.state.status ? "block" : "none",
                      color: "green",
                      fontSize: "3vh",
                    }}
                  >
                    Your Booking Request is successfully send to Escort
                  </label> */}
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Container>
        <Footer />
      </>
    );
  }
}
