import React, { Component } from "react";

import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Viewmg from "../../../images/searchuser.png";
import { postData } from "../../FetchNodeServices";

export default class ViewDetails extends Component {
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
    };
  }
  componentDidMount() {
    const token = localStorage.getItem("TOKEN");
    console.log("props: ", this.props);
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
    if (Object.keys(this.state.userDetails).length) {
      const body = {
        customerID: this.state.userDetails._id,
        escortID: this.props.escort._id,
        agencyID:
          this.props.details.typePlan === "inCall"
            ? this.props.details.agencyId
            : null,
        specialRequest: this.state.specialRequest,
        date: this.props.details.date,
        duration: this.props.details.duration,
        outCall: this.props.details.typePlan === "outCall",
        inCall: this.props.details.typePlan === "inCall",
        outCallPlan:
          this.props.details.typePlan === "outCall"
            ? this.props.details.selectedPlan
            : {},
        inCallPlan:
          this.props.details.typePlan === "inCall"
            ? this.props.details.selectedPlan
            : {},
        hotal: { name: this.state.hotal, roomNumber: this.state.roomNumber },
        address: this.state.address,
      };
      const result = await postData("booking/book-escort-directly", body);
      if (result.response) {
        console.log(result.response.data);
        this.setState({ errors: result.response.data.errors });
      } else {
        this.setState({ status: "success", errors: {} });
      }
    } else {
      const body = {
        customerName: this.state.name,
        customerEmail: this.state.email,
        escortID: this.props.escort._id,
        agencyID:
          this.props.details.typePlan === "inCall"
            ? this.props.details.agencyId
            : null,
        specialRequest: this.state.specialRequest,
        date: this.props.details.date,
        duration: this.props.details.duration,
        outCall: this.props.details.typePlan === "outCall",
        inCall: this.props.details.typePlan === "inCall",
        outCallPlan:
          this.props.details.typePlan === "outCall"
            ? this.props.details.selectedPlan
            : {},
        inCallPlan:
          this.props.details.typePlan === "inCall"
            ? this.props.details.selectedPlan
            : {},
        hotal: { name: this.state.hotal, roomNumber: this.state.roomNumber },
        address: this.state.address,
      };
      const result = await postData("booking/book-escort-without-login", body);
      if (result.response) {
        console.log(result.response.data);
        this.setState({ errors: result.response.data.errors });
      } else {
        this.setState({ status: "success", errors: {} });
      }
    }
  };

  render() {
    const { escort, details } = this.props;
    return (
      <>
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
                          <i className="flaticon-clock"></i> {details.date}
                        </li>
                        <li>
                          <i className="flaticon-alarm-clock"></i>{" "}
                          {details.duration} hr
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
                    display: this.state.errors.customerName ? "block" : "none",
                    color: "red",
                  }}
                >
                  {this.state.errors.customerName}
                </label>
              </Form.Group>

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
                    display: this.state.errors.customerEmail ? "block" : "none",
                    color: "red",
                  }}
                >
                  {this.state.errors.customerEmail}
                </label>
              </Form.Group>
              {this.props.details.typePlan === "outCall" ? (
                <>
                  <Form.Group>
                    <Form.Label>Hotel Name</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Hotal Name"
                      value={this.state.hotal}
                      onChange={(e) => this.setState({ hotal: e.target.value })}
                    ></Form.Control>
                    <label
                      style={{
                        display: this.state.errors.hotalName ? "block" : "none",
                        color: "red",
                      }}
                    >
                      {this.state.errors.hotalName}
                    </label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Room Number</Form.Label>
                    <Form.Control
                      type="email"
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
                    type="email"
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
                <Button variant="false" className="btn-outline-dark mr-2">
                  BACK
                </Button>
                <Link className="btn btn-primary" onClick={this.handleBooking}>
                  CONFIRM BOOKING
                </Link>
                <label
                  style={{
                    display: this.state.status ? "block" : "none",
                    color: "green",
                    fontSize: "3vh",
                  }}
                >
                  Your Booking Request is successfully send to Escort
                </label>
              </Form.Group>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
